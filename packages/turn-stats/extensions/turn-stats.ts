import type {
  ExtensionAPI,
  MessageUpdateEvent,
  TurnEndEvent,
  TurnStartEvent,
} from "@earendil-works/pi-coding-agent";

const formatDuration = (totalSeconds: number): string => {
  const roundedSeconds = Math.floor(totalSeconds);

  if (roundedSeconds < 60) return `${roundedSeconds}s`;

  const h = Math.floor(roundedSeconds / 3600);
  const m = Math.floor((roundedSeconds % 3600) / 60);
  const s = roundedSeconds % 60;

  const parts = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0 || h > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);

  return parts.join("");
};

export default function (pi: ExtensionAPI) {
  let turnStartTime = 0;
  let firstTokenTime = 0;

  pi.on("turn_start", async (event: TurnStartEvent, _ctx) => {
    turnStartTime = event.timestamp;
    firstTokenTime = 0;
  });

  pi.on("message_update", async (event: MessageUpdateEvent, _ctx) => {
    if (firstTokenTime !== 0) return;
    const deltaType = event.assistantMessageEvent.type;
    if (
      deltaType !== "text_delta" &&
      deltaType !== "thinking_delta" &&
      deltaType !== "toolcall_delta"
    ) {
      return;
    }
    firstTokenTime = Date.now();
  });

  pi.on("turn_end", async (event: TurnEndEvent, ctx) => {
    const turnEnd = Date.now();

    const msg = event.message;
    if (msg.role !== "assistant") return;

    const outputTokens = (msg as any).usage?.output ?? 0;

    const totalElapsedMs = turnStartTime > 0 ? turnEnd - turnStartTime : 0;
    const totalElapsedSec = totalElapsedMs / 1000;

    const streamingMs = firstTokenTime > 0 ? turnEnd - firstTokenTime : 0;
    const streamingSec = streamingMs / 1000;

    const tps =
      streamingSec > 0
        ? (outputTokens / streamingSec).toFixed(1)
        : totalElapsedSec > 0
          ? (outputTokens / totalElapsedSec).toFixed(1)
          : "?";

    const timeString = formatDuration(totalElapsedSec);

    const theme = ctx.ui.theme;
    const stats = theme.fg(
      "dim",
      `⚡ ${tps} tok/s ⏰ ${timeString} [${outputTokens} tokens]`,
    );
    ctx.ui.setStatus("turn-stats", stats);
  });
}
