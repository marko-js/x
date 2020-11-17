import { types as t, NodePath } from "@marko/babel-types";

type FunctionPlugin = (path: NodePath<any>, types: typeof t) => void;
type EnterExitPlugin = {
  enter?(path: NodePath<any>, types: typeof t): void;
  exit?(path: NodePath<any>, types: typeof t): void;
};

type ModulePlugin = {
  default: EnterExitPlugin | FunctionPlugin;
};

export type Plugin = ModulePlugin | EnterExitPlugin | FunctionPlugin;

export function enter<T extends t.Node>(
  modulePlugin: Plugin | void,
  path: NodePath<T>
) {
  if (!modulePlugin) {
    return false;
  }

  const { node } = path;
  const plugin = isModulePlugin(modulePlugin)
    ? modulePlugin.default
    : modulePlugin;

  if (isFunctionPlugin(plugin)) {
    plugin(path, t);
  } else if (plugin.enter) {
    plugin.enter(path, t);
  }

  return node !== path.node;
}

export function exit<T extends t.Node>(
  modulePlugin: Plugin | void,
  path: NodePath<T>
) {
  if (!modulePlugin) {
    return false;
  }

  const { node } = path;
  const plugin = isModulePlugin(modulePlugin)
    ? modulePlugin.default
    : modulePlugin;

  if (!isFunctionPlugin(plugin) && plugin.exit) {
    plugin.exit(path, t);
  }

  return node !== path.node;
}

function isModulePlugin(plugin: Plugin): plugin is ModulePlugin {
  return Boolean((plugin as ModulePlugin).default);
}

function isFunctionPlugin(
  plugin: EnterExitPlugin | FunctionPlugin
): plugin is FunctionPlugin {
  return typeof plugin === "function";
}
