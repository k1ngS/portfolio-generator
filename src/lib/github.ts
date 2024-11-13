export async function createGithubRepo(repoName: string, token: string) {
  const response = await fetch('https://api.github.com/user/repos', {
    method: 'POST',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: repoName,
      private: false,
      auto_init: true
    })
  })
  return response.json()
}
