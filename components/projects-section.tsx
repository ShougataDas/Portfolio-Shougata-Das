import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

export function ProjectsSection() {
  const projects = [
    {
      title: "Chess-Based Encryption using Reinforcement Learning",
      description:
        "Built an innovative encryption system using chess mechanics and DQN. Custom Gym environment, TensorFlow + PyTorch, Streamlit frontend.",
      technologies: ["Python", "TensorFlow", "PyTorch", "Streamlit", "Reinforcement Learning"],
      github: "https://github.com/ShougataDas/Chess-based-Data-encryption-using-CNN-RL",
      image: "/Chess_project.png",
    },
    {
      title: "Project Sharko: AI-Powered Shark Hotspot Prediction",
      description:
        "Developed an AI-driven system that predicts shark foraging hotspots by fusing NASA satellite data with global shark occurrence records. Built multi-tiered models for forecasting ocean conditions and validated results through the Metabolic Kill Tag hardware concept.",
      technologies: ["Python", "TensorFlow", "Scikit-learn", "Pandas", "GeoPandas", "Vercel"],
      github: "https://github.com/midul9797/sharko",
      image: "/Sharko_project.png",
      live: "https://sharko-omega.vercel.app/",
    },
  ]

  return (
    <section id="projects" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary font-[family-name:var(--font-playfair)] animate-fadeInUp">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fadeInUp"
              style={{ animationDelay: `${200 + index * 200}ms` }}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary group-hover:text-accent transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-secondary/20 text-secondary text-sm rounded-full animate-fadeInUp hover:scale-105 transition-transform"
                      style={{ animationDelay: `${400 + index * 200 + techIndex * 50}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button size="sm" asChild className="hover:scale-105 transition-transform">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                  {project.live && (
                    <Button size="sm" variant="secondary" asChild className="hover:scale-105 transition-transform">
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Live
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}