import path from "node:path";
import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";

type Status = "idle" | "working" | "done";

const EMOJI: Record<Status, string> = {
  idle:    "🟢",
  working: "🟡",
  done:    "🔵",
};

const ESC = "\x1b";
const ST = `${ESC}\\`; // string terminator

function sanitize(text: string): string {
  return text.replace(/[\p{Cc}]/gu, " ").slice(0, 256);
}

export default function (pi: ExtensionAPI) {
  let doneTimer: ReturnType<typeof setTimeout> | null = null;

  // ---------- helpers ----------

  function buildTitle(ctx: ExtensionContext, status: Status): string {
    const dir = path.basename(ctx.cwd);
    const session = pi.getSessionName();
    const label = session ? `${session} – ${dir}` : dir;
    return `${EMOJI[status]} π – ${label}`;
  }

  function applyTitle(ctx: ExtensionContext, status: Status) {
    ctx.ui.setTitle(buildTitle(ctx, status));
  }

  function clearDoneTimer() {
    if (doneTimer !== null) {
      clearTimeout(doneTimer);
      doneTimer = null;
    }
  }

  // Desktop notification via a single OSC 99 chunk (d defaults to 1 = display
  // now). Everything goes in the title to avoid any multi-chunk edge cases.
  // `o=unfocused` = terminal only shows it when its window isn't focused.
  function notify(ctx: ExtensionContext, text: string) {
    if (ctx.mode !== "tui") return; // avoid corrupting rpc/print/json output
    process.stdout.write(`${ESC}]99;i=pi:o=unfocused;${sanitize(text)}${ST}`);
  }

  pi.on("session_start", async (_event, ctx) => {
    clearDoneTimer();
    applyTitle(ctx, "idle");
  });

  pi.on("agent_start", async (_event, ctx) => {
    clearDoneTimer();
    applyTitle(ctx, "working");
  });

  pi.on("session_shutdown", async () => {
    clearDoneTimer();
  });

  pi.on("agent_end", async (_event, ctx) => {
    clearDoneTimer();
    applyTitle(ctx, "done");

    const dir = path.basename(ctx.cwd);
    const session = pi.getSessionName();
    notify(ctx, session ? `π – Done · ${session} (${dir})` : `π – Done · ${dir}`);

    // Revert to Idle after 8 s
    doneTimer = setTimeout(() => {
      doneTimer = null;
      applyTitle(ctx, "idle");
    }, 8_000);
  });
}
