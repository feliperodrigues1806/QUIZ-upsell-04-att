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
  prompt: `Based on the user's responses to the following questions, create a personalized analysis highlighting how the {{upsellProductName}} can address their specific pain points.\

Question 1 Response: {{{question1Response}}}
Question 2 Response: {{{question2Response}}}
Question 3 Response: {{{question3Response}}}

Expert Name: {{{expertName}}}
Upsell Product Name: {{{upsellProductName}}}

Instructions:
1.  Acknowledge the user's struggles based on their responses.
2.  Explain how the {{upsellProductName}} directly addresses those struggles.
3.  Highlight the key benefits they will experience, such as more time, less distractions, and increased focus.
4.  Keep the tone encouraging and motivating, positioning the upsell as the perfect solution to their problems.
5. Generate 3 benefits for the user.\
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
