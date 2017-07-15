# Things that threw me for a little while

1. Forgetting to check the operator I want to transform on, e.g. `path.node.operator === '**'`. Without that condition, it fluffs everything.
2. The parameters for `memberExpression` type should be normal literals, not wrapped in a Babel type. i.e. ``'something'` vs `t.stringLiteral('something')``.

The rest was all straightforward.