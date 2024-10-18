# playwright-datatog-issue

This is a repo to reproduce the issue that starting spans in dd-trace will not get attached to the traces started by the playwright plugin.

**Steps to reproduce**

1. Clone repo: `gh repo clone Uniqen/playwright-datatog-issue`
2. In the downloaded folder run: `npm install`
3. Setup playwright: `npm exec playwright install``
4. Run the test with dd-trace enabled: `DD_TRACE_DEBUG=true NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my_test_service DD_CIVISIBILITY_AGENTLESS_ENABLED=true DD_API_KEY=<DD_API_KEY> DD_SITE="datadoghq.eu" npm run test`

**Expected behaviour**

Traces started in test should get the same traceId as the traces started by the playwright plugin.

**Actual behaviour**

The parent_id for the span started inside the test is "0000000000000000" and not the span_id of the test.

Example output:

Encoding payload: [{"trace_id":"51cfc3dcab15eefb","span_id":"51cfc3dcab15eefb","parent_id":**"0000000000000000"**,"name":"MyTestSpan","resource":"MyTestSpan","error":0,"meta":{"_dd.p.tid":"670edae200000000","_dd.p.dm":"-0","service":"my_test_service","env":"ci","version":"1.0.0","runtime-id":"8100f6be-65f5-4f96-90af-d8eb8a5ad4d4","_dd.origin":"ciapp-test","language":"javascript"},"metrics":{"_dd.agent_psr":1,"_dd.top_level":1,"process_id":11718,"_sampling_priority_v1":1},"start":1729026786572016600,"duration":344545898,"links":[],"service":"my_test_service"}]
Request to the intake: {"path":"/api/v2/citestcycle","method":"POST","headers":{"Content-Type":"application/msgpack"},"timeout":15000,"url":"https://citestcycle-intake.datadoghq.eu/"}
