/**
 *
 * @param handler a callback function
 * @returns {function(*, *, *): Promise<Awaited<*>>} a resolved promise or an error caught by the next middleware
 */
const CatchAsyncErrorsHelper = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);

module.exports = { CatchAsyncErrors: CatchAsyncErrorsHelper };
