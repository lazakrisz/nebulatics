import { EndpointContext, InputContext } from "better-call";
import { AsyncLocalStorage } from "node:async_hooks";

type Context = EndpointContext<string, any> & InputContext<string, any>;

let _cls: AsyncLocalStorage<Context> | undefined;

function setupContext() {
  if (!_cls) {
    const cls = new AsyncLocalStorage<Context>();
    _cls = cls;
  }

  return _cls;
}

export function getContext() {
  if (!_cls) {
    // todo: turn this into a core error?

    throw new Error("Context not setup");
  }

  return _cls.getStore();
}

interface RunnerFunction<T> {
  (): T;
}

export function runWithContext<T>(context: Context, fn: RunnerFunction<T>) {
  const cls = setupContext();

  return cls.run(context, fn);
}
