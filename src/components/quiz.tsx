"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Loader2, CheckCircle, ShieldCheck, ArrowRight, CornerDownRight } from 'lucide-react';
import { personalizedUpsellAnalysis, type PersonalizedUpsellAnalysisOutput } from '@/ai/flows/personalized-upsell-analysis';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { ProductivityChart } from '@/components/productivity-chart';
import { Badge } from './ui/badge';

type Answers = {
  q2: string;
  q3: string;
};

export function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ q2: '', q3: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<PersonalizedUpsellAnalysisOutput | null>(null);
  const { toast } = useToast();

  const progress = useMemo(() => {
    if (step < 2) return 0;
    if (step === 2) return 33;
    if (step === 3) return 67;
    if (step >= 4) return 100;
    return 0;
  }, [step]);

  const handleAnswer = (question: keyof Answers, answer: string) => {
    setAnswers((prev) => ({ ...prev, [question]: answer }));
    setStep((prev) => prev + 1);
  };

  const handleGetAnalysis = async () => {
    setIsLoading(true);
    setStep(5); // Go to loading screen

    try {
      const result = await personalizedUpsellAnalysis({
        question1Response: "O usuário sente que seu tempo está escapando e que as redes sociais roubam sua atenção e energia.",
        question2Response: answers.q2,
        question3Response: answers.q3,
        expertName: "Lucas Semenzato",
        upsellProductName: "Detox Digital: Desafio 7 Dias sem Procrastinação",
      });
      setAnalysisResult(result);
      setStep(6);
    } catch (e) {
      console.error(e);
      toast({
        title: "Ocorreu um erro",
        description: "Não foi possível gerar sua análise. Por favor, tente novamente.",
        variant: "destructive",
      });
      setStep(4); // Go back to expert screen
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    const key = `step-${step}`;
    const animationClass = "animate-in fade-in-50 duration-500";
    
    switch (step) {
      case 0:
        return (
          <div key={key} className={animationClass}>
            <CardHeader className="items-center text-center">
              <Badge variant="outline" className="border-primary text-primary mb-3">Bônus Exclusivo</Badge>
              <CardTitle className="text-2xl font-bold">Parabéns! Sua vaga no Desafio “Durma igual um Bebê em 7 Dias” está confirmada!</CardTitle>
              <CardDescription className="!mt-3">Verifique seu e-mail agora mesmo: seu acesso ao desafio exclusivo já foi enviado.</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-secondary/30 p-4 rounded-lg border border-secondary text-left space-y-2">
                <p className="font-bold text-lg">🎁 Presente para você:</p>
                <p className="text-muted-foreground">Como novo participante, você ganhou acesso a uma <span className="font-bold text-primary">Consultoria Digital Gratuita</span> (diagnóstico personalizado para acelerar seu resultado).</p>
              </div>
              <div className="!mt-6 space-y-2">
                <p className="font-semibold">Descubra em menos de 2 minutos onde está o maior inimigo do seu tempo – e como cortar pela raiz!</p>
                <p className="text-sm text-muted-foreground">Responda 3 perguntas rápidas e desbloqueie seu diagnóstico VIP gratuito.</p>
                <p className="text-xs text-muted-foreground/70 pt-2">(Oferta liberada só nesta página para alunos do desafio.)</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full font-bold text-lg" size="lg" onClick={() => setStep(1)}>
                Quero minha consultoria gratuita
                <ArrowRight className="ml-2" />
              </Button>
            </CardFooter>
          </div>
        );
      case 1:
        return (
          <div key={key} className={animationClass}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Você sente que seu tempo está sempre escapando pelos dedos, e as redes sociais roubam sua atenção e energia?</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                <p className="text-lg text-muted-foreground">Se isso acontece com você, sua rotina está desorganizada. Bora descobrir como resolver isso?</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full font-bold text-lg" size="lg" onClick={() => setStep(2)}>
                Continuar
              </Button>
            </CardFooter>
          </div>
        );
      case 2:
        return (
          <div key={key} className={animationClass}>
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold">Você já tentou controlar o uso do celular, mas acaba voltando ao mesmo ciclo de distração?</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <Button variant="outline" size="lg" className="h-auto py-4 text-wrap justify-start" onClick={() => handleAnswer('q2', 'Sim, já tentei de tudo, mas sempre volto ao vício digital.')}>
                <span className="text-2xl mr-4">😩</span> Sim, já tentei de tudo, mas sempre volto ao vício digital.
              </Button>
              <Button variant="outline" size="lg" className="h-auto py-4 text-wrap justify-start" onClick={() => handleAnswer('q2', 'Não, nunca consegui aplicar nada por conta própria.')}>
                <span className="text-2xl mr-4">😐</span> Não, nunca consegui aplicar nada por conta própria.
              </Button>
            </CardContent>
          </div>
        );
      case 3:
        return (
          <div key={key} className={animationClass}>
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold">Você já investiu em apps, planners ou métodos de produtividade que não resolveram?</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <Button variant="outline" size="lg" className="h-auto py-4 text-wrap justify-start" onClick={() => handleAnswer('q3', 'Sim, e ainda continuo lutando contra distrações.')}>
                <span className="text-2xl mr-4">😩</span> Sim, e ainda continuo lutando contra distrações.
              </Button>
              <Button variant="outline" size="lg" className="h-auto py-4 text-wrap justify-start" onClick={() => handleAnswer('q3', 'Não, mas tenho receio de gastar e não resolver.')}>
                <span className="text-2xl mr-4">😐</span> Não, mas tenho receio de gastar e não resolver.
              </Button>
            </CardContent>
          </div>
        );
      case 4:
        return (
          <div key={key} className={animationClass}>
            <CardHeader className="p-0 text-center">
              <Image
                src="https://i.imgur.com/sLKnHOi.png"
                alt="Lucas Semenzato"
                width={1536}
                height={1024}
                className="w-full h-auto rounded-t-lg"
                data-ai-hint="man portrait"
              />
              <div className="p-6">
                <CardTitle className="text-2xl font-bold">Prazer, sou Lucas Semenzato!</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <p>Há 9 anos ajudo pessoas comuns a retomarem o controle do tempo, cortando o mal pela raiz: o vício digital.</p>
              <p className="font-semibold text-primary mt-4">O Detox Digital é o seu atalho para liberdade, foco e produtividade real.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full font-bold text-lg" size="lg" onClick={handleGetAnalysis}>
                Ver minha análise
              </Button>
            </CardFooter>
          </div>
        );
      case 5: // Loading screen
        return (
          <div key={key} className={`${animationClass} flex flex-col items-center justify-center text-center p-8 min-h-[300px]`}>
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <p className="text-lg font-semibold mt-4">Analisando suas respostas...</p>
            <p className="text-muted-foreground">Preparando sua oferta exclusiva.</p>
          </div>
        );
      case 6: // Results screen
        return (
          <div key={key} className={animationClass}>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-black text-primary">Você está pronto(a) para desbloquear seu máximo potencial.</CardTitle>
              <p className="text-muted-foreground mt-2">conheça o Detox Digital: Desafio 7 Dias Sem Procrastinação</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <Image 
                src="https://i.imgur.com/CPhsV7O.png" 
                alt="Detox Digital: Desafio 7 Dias sem Procrastinação" 
                width={956} 
                height={148}
                className="w-full h-auto"
                data-ai-hint="logo text"
              />
              <div className="bg-secondary/30 p-4 rounded-lg border border-secondary">
                  <h3 className="font-bold mb-2 flex items-center"><CornerDownRight className="w-4 h-4 mr-2 text-primary"/> Sua Análise Personalizada:</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">{analysisResult?.analysis}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold">Com o Detox Digital: Desafio 7 Dias sem Procrastinação, você vai:</h3>
                <ul className="space-y-2">
                  {analysisResult?.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <ProductivityChart />
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <Badge variant="destructive" className="mb-2 text-base animate-pulse">Oferta Relâmpago!</Badge>
                <p className="text-2xl font-bold">Adicione o <span className="text-primary">Detox Digital: Desafio 7 Dias sem Procrastinação</span> com 50% OFF!</p>
                <p className="text-muted-foreground">Exclusivo para novos alunos.</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button asChild className="w-full font-bold text-xl h-14" size="lg">
                <a href="https://www.ggcheckout.com/checkout/v2/SVU4imKOgqOWMMQhXiTK" target="_blank" rel="noopener noreferrer">
                  GARANTIR MINHA VAGA
                </a>
              </Button>
              <div className="flex items-center text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                <span>7 dias de garantia incondicional, risco zero!</span>
              </div>
            </CardFooter>
          </div>
        );
      default:
        return <div key="default">Ocorreu um erro. Por favor, atualize a página.</div>;
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <Progress value={progress} className="mb-4 h-2 bg-secondary" />
      <Card className="overflow-hidden shadow-2xl shadow-primary/5 border-secondary backdrop-blur-sm bg-card/80">
        {renderStep()}
      </Card>
    </div>
  );
}
