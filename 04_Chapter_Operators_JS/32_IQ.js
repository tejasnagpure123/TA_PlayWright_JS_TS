let isCI = true
let responseTime = 850
let sla = 1000;
let slaStatus = responseTime <= sla ? "Within SLA: " : "SLA Breached"
console.log(`Response: ${responseTime}ms - ${slaStatus}`)