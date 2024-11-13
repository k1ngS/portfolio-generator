export async function deployToVercel(repoUrl: string, token: string) {
  const response = await fetch('https://api.vercel.com/v1/deployments', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'portfolio',
      gitRepository: {
        type: 'github',
        repo: repoUrl
      }
    })
  })
  return response.json()
}
