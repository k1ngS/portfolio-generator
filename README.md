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

```typescript
interface PortfolioData {
  name: string;
  role: string;
  about: string;
  skills: string[];
  avatar?: string;
  email: string;
}
```

### ImageOptimizer
Componente para otimização e lazy loading de imagens.

**Features:**
- Lazy loading
- Blur placeholder
- Animação de carregamento
- Otimização automática

### UI Components (shadcn/ui)
Conjunto de componentes base reutilizáveis:
- Button
- Dialog
- Input
- Label
- Textarea
- Toast

## Funcionalidades

### SEO
Implementado através do `meta-tags.tsx`:
- Meta tags dinâmicas
- OpenGraph tags
- Twitter cards
- Sitemap automático

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

### Otimizações de Performance
1. Lazy Loading
```typescript
const Preview = dynamic(() => import('./Preview'))
```

2. Image Optimization
```typescript

```

3. Cache
```typescript
// Salvando dados
formCache.set('portfolioForm', formData)

// Recuperando dados
const cached = formCache.get('portfolioForm')
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
