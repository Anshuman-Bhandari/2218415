export async function Log(stack, level, pkg, message) {
  try {
    const res = await fetch("http://20.244.56.144/evaluation-service/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbnNodW1hbi4yMy4yMDA0QGdtYWlsLmNvbSIsImV4cCI6MTc1MjU1NzU0NywiaWF0IjoxNzUyNTU2NjQ3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMGE4OGY0NjUtOTg5Ny00Y2I3LTk3ZWQtNWQ2M2E2NzNmOWNjIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYW5zaHVtYW4gYmhhbmRhcmkiLCJzdWIiOiIxOWNlMTlmZi1iYjI1LTRmZmQtYjdjZS1iZjViMzE2NTZkMmIifSwiZW1haWwiOiJhbnNodW1hbi4yMy4yMDA0QGdtYWlsLmNvbSIsIm5hbWUiOiJhbnNodW1hbiBiaGFuZGFyaSIsInJvbGxObyI6IjIyMTg0MTUiLCJhY2Nlc3NDb2RlIjoiUUFoRFVyIiwiY2xpZW50SUQiOiIxOWNlMTlmZi1iYjI1LTRmZmQtYjdjZS1iZjViMzE2NTZkMmIiLCJjbGllbnRTZWNyZXQiOiJiYWpSdVJyZXJwWXdHQ2NLIn0.dKUHb1q6Gl0OElw3ItYacx-yDYArXOvjnd_p386HpH0`
      },
      body: JSON.stringify({ stack, level, package: pkg, message })
    });

    // Optionally log to debug (REMOVE in production)
    console.log(`[LOG] ${level} - ${pkg}: ${message}`);
  } catch (err) {
    console.error("Logging failed:", err.message);
  }
}
