export type TransformResFn<T, R = unknown> = (res: R) => T;

export type TErrorResponse = {
  error: Record<string, any>;
  data?: any;
};
