import { Quiz } from '@/components/quiz';

export default function Home() {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center bg-background p-4 font-body selection:bg-primary/20">
      <Quiz />
    </div>
  );
}
