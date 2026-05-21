import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { CourseProgressCard } from "@/components/dashboard/CourseProgress";
import { StatCard } from "@/components/dashboard/StatCard";
import { ScheduleCard } from "@/components/dashboard/ScheduleCard";
import { CoursesCard } from "@/components/dashboard/CoursesCard";
import { SkillsRadar } from "@/components/dashboard/SkillsRadar";
import { ActivityCard } from "@/components/dashboard/ActivityCard";
import { NextLessonCard } from "@/components/dashboard/NextLessonCard";
import { TodoCard } from "@/components/dashboard/TodoCard";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { NewsCard } from "@/components/dashboard/NewsCard";
import { LeaderboardCard } from "@/components/dashboard/LeaderboardCard";
import { StudyTimerWidget } from "@/components/dashboard/StudyTimerWidget";
import { AchievementsCard } from "@/components/dashboard/AchievementsCard";
import { HeroBanner } from "@/components/dashboard/HeroBanner";
import { AIInsightsCard } from "@/components/dashboard/AIInsightsCard";
import { PromoBanner } from "@/components/dashboard/PromoBanner";
import { QuickQuizCard } from "@/components/dashboard/QuickQuizCard";
import { stats } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — EduPro Student Panel v6" },
      { name: "description", content: "EduPro o'quvchi paneli v6 — AI Yordamchi, AI Quiz, kurs progressi, dars jadvali, vazifalar va balans." },
      { property: "og:title", content: "EduPro — AI Student Dashboard v6" },
      { property: "og:description", content: "Claude AI, Gemini va GPT-4 bilan qurollangan zamonaviy talaba paneli." },
      { name: "keywords", content: "edupro, student panel, AI tutor, uzbek education, online learning" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <AppShell
      rightRail={
        <>
          <NextLessonCard />
          <AIInsightsCard />
          <QuickQuizCard />
          <StudyTimerWidget />
          <AchievementsCard />
          <TodoCard />
          <BalanceCard />
        </>
      }
    >
      <HeroBanner />
      <PromoBanner />
      <CourseProgressCard />
      <div className="grid gap-2 grid-cols-2 sm:gap-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
        {stats.map((s, i) => (
          <StatCard key={s.key} stat={s} index={i} />
        ))}
      </div>
      <NewsCard />
      <div className="grid gap-3 grid-cols-1 sm:gap-4 sm:grid-cols-2 lg:grid-cols-2 w-full">
        <ScheduleCard />
        <CoursesCard />
      </div>
      <div className="grid gap-3 grid-cols-1 sm:gap-4 sm:grid-cols-2 lg:grid-cols-2 w-full">
        <SkillsRadar />
        <ActivityCard />
      </div>
      <LeaderboardCard />
    </AppShell>
  );
}
