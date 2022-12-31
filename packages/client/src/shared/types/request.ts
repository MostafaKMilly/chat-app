export type TransformResFn<T, R = unknown> = (res: R) => T;

export type TErrorResponse = {
  errors: Record<string, any>;
  data?: any;
};
