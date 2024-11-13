# Portfolio Generator Documentation

## Índice
1. [Instalação](#instalação)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Componentes](#componentes)
4. [Funcionalidades](#funcionalidades)
5. [Internacionalização](#internacionalização)
6. [SEO & Performance](#seo--performance)
7. [Segurança](#segurança)

## Instalação

```bash
# Instalar dependências base
npm install @hookform/resolvers zod react-hook-form

# Instalar componentes shadcn/ui
npx shadcn@latest init
npx shadcn@latest add button dialog input label textarea toast
```

## Estrutura do Projeto

```
├── app/
│   └── [locale]/
│       ├── components/
│       │   └── ImageOptimizer.tsx
│       ├── layout.tsx
│       └── page.tsx
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── textarea.tsx
│       └── toast.tsx
├── i18n/
│   └── locales/
│       ├── en.json
│       ├── pt-br.json
│       ├── fr.json
│       └── es.json
└── lib/
    ├── cache.ts
    ├── meta-tags.tsx
    ├── sanitize.ts
    └── utils.ts
```

## Componentes

### PortfolioForm
Principal componente do formulário que gerencia os dados do portfolio.

**Funcionalidades:**
- Validação de formulário com react-hook-form e zod
- Upload e preview de avatar
- Feedback visual durante deploy
- Preview em modal
- Cache de formulário
- Sanitização de inputs
- Alteração no Avatar: O campo avatar agora pode aceitar tanto arquivos (File) quanto URLs. O preview da imagem é exibido com base no tipo de valor do campo.

```typescript
interface PortfolioData {
  name: string;
  role: string;
  about: string;
  skills: string[];
  avatar?: string | File;
  email: string;
}
```

## Funcionalidades

### Avatar Upload e Preview
O campo avatar agora pode receber tanto arquivos (File) quanto URLs. Se um arquivo for enviado, ele será convertido em um URL temporário para o preview. Se uma URL for fornecida, ela será usada diretamente no campo.


### Componente de Avatar:
```tsx
const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setValue('avatar', reader.result);  // Armazena a URL do arquivo
    };
    reader.readAsDataURL(file);
  }
};
```
### Preview da Imagem:
```tsx
{formData.avatar && (
  <img
    src={
      formData.avatar instanceof File
        ? URL.createObjectURL(formData.avatar)  // Para arquivo
        : formData.avatar  // Para URL
    }
    alt="Preview avatar"
    className="w-32 h-32 rounded-full object-cover mx-auto"
  />
)}
```

### Submissão de Formulário
O campo avatar pode ser enviado como um arquivo ou uma URL para o backend. Quando o campo avatar for um arquivo, ele será enviado como FormData. Caso contrário, será enviado como uma URL.

```tsx
const onSubmit = async (data) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('role', data.role);
  formData.append('about', data.about);
  formData.append('email', data.email);

  data.skills.forEach((skill, index) => {
    formData.append(`skills[${index}]`, skill);
  });

  if (data.avatar instanceof File) {
    formData.append('avatar', data.avatar);
  } else if (typeof data.avatar === 'string') {
    formData.append('avatarUrl', data.avatar);
  }

  await fetch('/api/submit', {
    method: 'POST',
    body: formData,
  });
};
```

### Cache
Sistema de cache local para dados do formulário:
```typescript
formCache.set(key, value)
formCache.get(key)
formCache.clear(key)
```

### Sanitização
Proteção contra XSS e inputs maliciosos:
```typescript
const sanitizedValue = sanitizeInput(rawInput)
```

## Internacionalização

Suporte para múltiplos idiomas:
- English (en)
- Português (pt-br)
- Français (fr)
- Español (es)

Estrutura de traduções:
```json
{
  "portfolio": {
    "title": "...",
    "personalInfo": {
      "title": "...",
      "name": "..."
    }
  }
}
```

## SEO & Performance

### Meta Tags
```typescript
export function generateMetadata(data) {
  return {
    title: `${data.name} - Portfolio`,
    description: data.about,
    openGraph: {...},
    twitter: {...}
  }
}
```

## Segurança

### Sanitização de Inputs
```typescript
const sanitizedValue = sanitizeInput(rawInput)
```

### Validação de Formulário
```typescript
const portfolioSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  // ...
})
```
Essa atualização reflete as mudanças feitas para o campo avatar, incluindo a lógica de preview de imagem e o comportamento de envio de File ou URL.

## Boas Práticas

1. Sempre sanitize inputs do usuário antes de usar
2. Use lazy loading para componentes pesados
3. Implemente feedback visual para ações assíncronas
4. Mantenha o cache atualizado
5. Use TypeScript para type safety
6. Siga as convenções de nomenclatura
7. Mantenha as traduções organizadas e completas

## Próximos Passos

1. Implementar mais temas/templates
2. Adicionar suporte para mais idiomas
3. Melhorar a acessibilidade
4. Implementar testes automatizados
5. Adicionar analytics
6. Melhorar a documentação
