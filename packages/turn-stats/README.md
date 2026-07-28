# @glevanov/turn-stats

Status bar **tok/s** + elapsed time.

```
⚡ 42.3 tok/s ⏰ 12s [380 tokens]
```

Throughput is measured from the first streamed content delta to `turn_end`,
so time-to-first-token (TTFT) and pre-stream "thinking" time don't dilute the rate.

## Install

```bash
pi install npm:@glevanov/turn-stats
```

## License

MIT
