'use server';
/**
 * @fileOverview Provides a personalized analysis based on user's quiz responses to motivate them to purchase the upsell product.
 *
 * - personalizedUpsellAnalysis - A function that returns the personalized analysis.
 * - PersonalizedUpsellAnalysisInput - The input type for the personalizedUpsellAnalysis function.
 * - PersonalizedUpsellAnalysisOutput - The return type for the personalizedUpsellAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedUpsellAnalysisInputSchema = z.object({
  question1Response: z.string().describe('The user response to question 1.'),
  question2Response: z.string().describe('The user response to question 2.'),
  question3Response: z.string().describe('The user response to question 3.'),
  expertName: z.string().describe('The name of the expert.'),
  upsellProductName: z.string().describe('The name of the upsell product.'),
});
export type PersonalizedUpsellAnalysisInput = z.infer<typeof PersonalizedUpsellAnalysisInputSchema>;

const PersonalizedUpsellAnalysisOutputSchema = z.object({
  analysis: z.string().describe('The personalized analysis of the user responses.'),
  benefits: z.array(z.string()).describe('A list of benefits the user will receive from the upsell product.'),
});
export type PersonalizedUpsellAnalysisOutput = z.infer<typeof PersonalizedUpsellAnalysisOutputSchema>;

export async function personalizedUpsellAnalysis(input: PersonalizedUpsellAnalysisInput): Promise<PersonalizedUpsellAnalysisOutput> {
  return personalizedUpsellAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedUpsellAnalysisPrompt',
  input: {schema: PersonalizedUpsellAnalysisInputSchema},
  output: {schema: PersonalizedUpsellAnalysisOutputSchema},
  prompt: `You are a helpful assistant. Your task is to generate a personalized analysis and a list of benefits for an upsell product based on a user's quiz answers.

Generate the 'analysis' field with the following text. Do not change it, just output it as is, but replace {{upsellProductName}} with the value from the input. Preserve the paragraph breaks.
---
Eu sei exatamente como você se sente: aquela sensação de que o tempo está escapando, enquanto as redes sociais e as notificações roubam sua atenção — e você termina o dia com a impressão de que não fez nada do que realmente importa. Você já tentou de tudo para se livrar desse ciclo de procrastinação, mas as distrações sempre voltam?

Foi por isso que criei o {{upsellProductName}}. Este desafio é feito para pessoas como você, que estão cansadas de promessas vazias e querem uma solução prática, direta e de resultado rápido para tomar de volta o controle do tempo e da própria vida.

Durante 7 dias, você terá um método comprovado para eliminar as distrações, focar no que realmente importa e transformar sua produtividade. Imagine acordar leve, com clareza mental, energia renovada e a satisfação de ver seu tempo sendo usado no que realmente te faz evoluir. É isso que o {{upsellProductName}} vai entregar para você: foco, liberdade e a versão mais produtiva de si mesmo(a).

Pronto para dar o primeiro passo?
---

Now, based on the user's answers below, generate exactly 3 benefits for the 'benefits' field. The benefits should be tailored to their specific pain points, be encouraging, and motivate them to purchase.

User's quiz answers:
Question 1 Response: {{{question1Response}}}
Question 2 Response: {{{question2Response}}}
Question 3 Response: {{{question3Response}}}

Upsell Product Name: {{{upsellProductName}}}
`,
});

const personalizedUpsellAnalysisFlow = ai.defineFlow(
  {
    name: 'personalizedUpsellAnalysisFlow',
    inputSchema: PersonalizedUpsellAnalysisInputSchema,
    outputSchema: PersonalizedUpsellAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
