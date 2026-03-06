# Imports

Use `@/` imports. Relative paths break when files move.

```typescript
// wrong
import { db } from "../../lib/db"
import { logger } from "./logger"

// right
import { db } from "@/lib/db"
import { logger } from "@/lib/logger"
```

No exceptions. Even co-located files in the same directory must use `@/`.
