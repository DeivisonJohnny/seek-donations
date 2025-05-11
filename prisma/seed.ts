import Prisma from "@/service/Prisma";

const news = [
  {
    id: 1,
    title: "Novo Avanço na Computação Quântica",
    description:
      "Cientistas alcançaram um grande marco na computação quântica, demonstrando coerência quântica sustentada por mais de 10 minutos.",
    url: "https://example.com/quantum-computing",
    category: "Tecnologia",
    publishedAt: "há 2 horas",
  },
  {
    id: 2,
    title: "Cúpula do Clima Global Alcança Acordo Histórico",
    description:
      "Líderes mundiais concordaram com novas metas ambiciosas para reduzir as emissões de carbono em 50% até 2030.",
    url: "https://example.com/climate-summit",
    category: "Meio Ambiente",
    publishedAt: "há 5 horas",
  },
  {
    id: 3,
    title: "Mercados de Ações Batem Recorde Histórico",
    description:
      "Principais índices atingiram níveis recordes hoje, impulsionados por fortes relatórios de lucros e dados econômicos positivos.",
    url: "https://example.com/stock-markets",
    category: "Finanças",
    publishedAt: "há 1 hora",
  },
  {
    id: 4,
    title:
      "Novo Modelo de IA Pode Prever Estruturas de Proteínas com 98% de Precisão",
    description:
      "Pesquisadores desenvolveram um sistema de IA que pode prever estruturas complexas de proteínas com precisão sem precedentes, potencialmente revolucionando a descoberta de medicamentos.",
    url: "https://example.com/ai-protein",
    category: "Ciência",
    publishedAt: "há 3 horas",
  },
  {
    id: 5,
    title: "Empresa de Turismo Espacial Anuncia Primeira Missão Lunar Civil",
    description:
      "Uma empresa privada de exploração espacial revelou planos para enviar civis em uma viagem ao redor da lua até 2025.",
    url: "https://example.com/lunar-mission",
    category: "Espaço",
  },
];

async function main() {
  await Promise.all(
    news.map((item) =>
      Prisma.category.upsert({
        where: { id: item.category.toLowerCase() },
        update: {
          id: item.category.toLowerCase(),
          name: item.category,
        },
        create: {
          id: item.category.toLowerCase(),
          name: item.category,
        },
      })
    )
  );

  await Promise.all(
    news.map((item) =>
      Prisma.news.create({
        data: {
          title: item.title,
          description: item.description,
          url: item.url,
          category: {
            connectOrCreate: {
              create: {
                id: item.category.toLowerCase(),
                name: item.category,
              },
              where: {
                id: item.category.toLowerCase(),
              },
            },
          },
        },
      })
    )
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    Prisma.$disconnect();
  });
