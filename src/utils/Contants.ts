export const MODEL_DEFAULT_GEMINI = "gemini-1.5-flash";

export const PROMPTS = {
  FETCH_NEWS: `Busque na web notícias e me retorne no máximo 10 itens com base no seguinte schema:

- title (string)
- description (string até 255 caracteres)
- url (string)
- categoryId (UUID aleatório)

Retorne apenas o JSON bruto, sem explicações, sem comentários, sem marcação de código (como três crases) e sem texto adicional. Traduza todos os textos para o português antes de responder.`,
};

export const QUERY_SEARCH = {
  NEWS: "Noticias sobre doações pessoas ou agencias com vulnerabilidade",
};
