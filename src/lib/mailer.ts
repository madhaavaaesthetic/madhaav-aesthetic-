/**
 * Server-only client for the Hostinger Email API, reached through Hostinger's MCP endpoint (JSON-RPC over HTTPS).
 * Needs HOSTINGER_MAIL_TOKEN and HOSTINGER_MAILBOX_ID in the server environment; never import this from client code.
 */

const ENDPOINT = process.env.HOSTINGER_MAIL_ENDPOINT || "https://mcp.mail.hostinger.com/mcp";

export const mailConfigured = () => Boolean(process.env.HOSTINGER_MAIL_TOKEN && process.env.HOSTINGER_MAILBOX_ID);

interface ToolResult {
  status: number;
  body: unknown;
}

async function callTool(name: string, args: Record<string, unknown>): Promise<ToolResult> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HOSTINGER_MAIL_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({ jsonrpc: "2.0", id: Date.now(), method: "tools/call", params: { name, arguments: { mailboxResourceId: process.env.HOSTINGER_MAILBOX_ID, ...args } } }),
    cache: "no-store",
    signal: AbortSignal.timeout(20000),
  });
  let raw = await res.text();
  if (!raw.trim().startsWith("{")) {
    const line = raw.split("\n").find((l) => l.startsWith("data:"));
    raw = line ? line.slice(5) : raw;
  }
  const rpc = JSON.parse(raw) as { result?: { content?: { text?: string }[]; isError?: boolean }; error?: { message: string } };
  if (rpc.error) throw new Error(`Mail API: ${rpc.error.message}`);
  const text = rpc.result?.content?.[0]?.text ?? "{}";
  let parsed: { status?: number; body?: unknown } = {};
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error(`Mail API returned an unexpected response: ${text.slice(0, 200)}`);
  }
  const status = parsed.status ?? (rpc.result?.isError ? 500 : 200);
  if (status >= 400) throw new Error(`Mail API ${name} failed (${status}): ${JSON.stringify(parsed.body).slice(0, 300)}`);
  return { status, body: parsed.body };
}

export interface MailAttachment {
  filename: string;
  content: string;
  contentType: string;
}

export async function sendEmail(opts: { to: string[]; subject: string; html: string; text: string; bcc?: string[]; attachments?: MailAttachment[] }) {
  await callTool("send_email", {
    displayName: "Madhaav Aesthetic",
    to: opts.to,
    ...(opts.bcc?.length ? { bcc: opts.bcc } : {}),
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
    ...(opts.attachments?.length ? { attachments: opts.attachments } : {}),
  });
}

/** Subjects of INBOX messages whose subject contains `needle` (used to count bookings per slot). */
export async function searchSubjects(needle: string, since?: string): Promise<string[]> {
  const subjects: string[] = [];
  for (let page = 1; page <= 3; page++) {
    const { body } = await callTool("messages_search", { folder: "INBOX", subject: needle, perPage: 100, page, ...(since ? { since } : {}) });
    const b = body as { data?: { subject?: string }[]; pagination?: { totalPages?: number } };
    (b.data ?? []).forEach((m) => m.subject && subjects.push(m.subject));
    if (!b.pagination?.totalPages || page >= b.pagination.totalPages) break;
  }
  // The API's subject search is token-based and loose, so keep only exact substring matches.
  const n = needle.toLowerCase();
  return subjects.filter((s) => s.toLowerCase().includes(n));
}
