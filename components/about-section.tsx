import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function AboutSection() {
  const skills = {
    languages: ["C", "C++", "Python", "Java (beginner)"],
    frameworks: ["PyTorch", "TensorFlow", "Streamlit", "Django", "REST API", "Git", "MySQL"],
    competencies: ["Data Structures", "Algorithms", "Machine Learning", "Deep Learning", "Reinforcement Learning"],
    tools: ["MS Office", "Google Workspace"],
  }

  return (
    <section id="about" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary font-[family-name:var(--font-playfair)] animate-fadeInUp">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slideInLeft">
            <div className="relative">
              <img
                src="/Shougata_Das_Linkedin.jpg"
                alt="Shougata Das"
                className="w-full max-w-md mx-auto rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="space-y-6 animate-slideInRight">
            <Card className="hover:shadow-lg transition-shadow duration-300 animate-fadeInUp animation-delay-200">
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed text-foreground">
                  I’m Shougata Das, a Computer Science student and aspiring AI/ML engineer with a strong background in algorithms, machine learning, and reinforcement learning. I’ve built projects like a chess-based encryption system using deep Q-learning and have hands-on experience with PyTorch, TensorFlow, and Streamlit.

                  As a competitive programmer (Codeforces Specialist, 4★ CodeChef) and former Senior Instructor at Programming Hero, I love tackling complex problems and sharing knowledge. My goal is to combine problem-solving skills with AI research to build intelligent systems that make a real impact.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="animate-fadeInUp animation-delay-300">
                <h3 className="text-xl font-semibold mb-3 text-primary">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.map((skill, index) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="hover:scale-105 transition-transform animate-fadeInUp"
                      style={{ animationDelay: `${400 + index * 100}ms` }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="animate-fadeInUp animation-delay-500">
                <h3 className="text-xl font-semibold mb-3 text-primary">Frameworks & Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.frameworks.map((skill, index) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="hover:scale-105 transition-transform animate-fadeInUp"
                      style={{ animationDelay: `${600 + index * 100}ms` }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="animate-fadeInUp animation-delay-700">
                <h3 className="text-xl font-semibold mb-3 text-primary">Core Competencies</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.competencies.map((skill, index) => (
                    <Badge
                      key={skill}
                      className="hover:scale-105 transition-transform animate-fadeInUp"
                      style={{ animationDelay: `${800 + index * 100}ms` }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
