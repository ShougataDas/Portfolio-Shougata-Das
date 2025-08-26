import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"

export function ExperienceSection() {
  const experiences = [
    {
      title: "Senior Computer Science Instructor",
      company: "Programming Hero",
      period: "Oct 2023 – Jan 2025",
      location: "Remote",
      description: [
        "Taught C++, Python, and problem-solving to 200+ students",
        "Designed course materials, live sessions (95% positive feedback)",
        "Wrote 10+ original problems and co-authored an algorithm e-book",
      ],
    },
  ]

  const achievements = [
    "Specialist on Codeforces (Max Rating 1404)",
    "4 Star on CodeChef (Max Rating 1804)",
    "Ranked 62 out of 308 Teams (Top 20%) in ICPC Asia Dhaka Onsite 2024",
    "53rd place UU Inter University Programming Contest 2025",
    "Champion of EDU Engineering Day Intra-University Contest 2025",
    "Solved 1400+ problems across Codeforces, CodeChef, LeetCode, LightOJ",
  ]

  return (
    <section id="experience" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto space-y-16">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-primary font-[family-name:var(--font-playfair)] animate-fadeInUp">
          Experience
        </h2>

        {/* Experience Timeline */}
        <div className="space-y-8">
          <h3 className="text-2xl font-semibold text-primary mb-8 animate-slideInLeft animation-delay-200">
            Professional Experience
          </h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20"></div>
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-12 pb-8 animate-fadeInUp animation-delay-300">
                <div className="absolute left-2 top-2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"></div>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">{exp.title}</CardTitle>
                    <CardDescription className="text-lg font-medium text-accent">{exp.company}</CardDescription>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {exp.location}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-accent mt-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-8">
           <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary font-[family-name:var(--font-playfair)] animate-fadeInUp">
          Achievements
        </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300 hover:scale-105 animate-fadeInUp"
                style={{ animationDelay: `${500 + index * 100}ms` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">🏆</Badge>
                    <p className="text-foreground">{achievement}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Extracurricular */}
        <div className="space-y-8">
           <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary font-[family-name:var(--font-playfair)] animate-fadeInUp">
          Leadership & Extracurricular
        </h2>
          <Card className="hover:shadow-lg transition-shadow duration-300 animate-fadeInUp animation-delay-900">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Coordinator & Executive Board Member</CardTitle>
              <CardDescription className="text-lg font-medium text-accent">East Delta University Computer Club</CardDescription>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                2024 – Present
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-2">•</span>
                  <span>Organized coding workshops, contests, and guest speaker sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-2">•</span>
                  <span> Built club wings (CP wing, Development wing)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-2">•</span>
                  <span> Served as a Problem Setter & Judge for onsite Contests organized by EDUCC</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
