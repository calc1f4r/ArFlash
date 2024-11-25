import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Heart, Trophy } from "lucide-react";

const values = [
  {
    icon: Users,
    title: "Community First",
    description: "Building a protocol governed by its users, for its users.",
  },
  {
    icon: Target,
    title: "Innovation",
    description: "Pushing the boundaries of DeFi with cutting-edge technology.",
  },
  {
    icon: Heart,
    title: "Trust & Security",
    description: "Maintaining the highest standards of security and reliability.",
  },
  {
    icon: Trophy,
    title: "Excellence",
    description: "Striving for excellence in every aspect of our protocol.",
  },
];

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    bio: "Former DeFi protocol architect with 10+ years in blockchain.",
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: "Blockchain security expert and Arweave core contributor.",
  },
  {
    name: "Elena Petrov",
    role: "Head of Research",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    bio: "PhD in Distributed Systems, specializing in consensus mechanisms.",
  },
  {
    name: "David Kim",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
    bio: "Full-stack developer with expertise in smart contract development.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1">
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              About Us
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Building the Future of DeFi on Arweave
            </p>
            <p className="mt-6 text-lg leading-8 text-foreground/60">
              ArFlash is pioneering the next generation of flash loan protocols,
              leveraging Arweave's unique architecture for unparalleled
              performance and security.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {values.map((value) => (
                <Card key={value.title} className="bg-muted/50">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <value.icon className="h-8 w-8 text-primary mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        {value.title}
                      </h3>
                      <p className="text-foreground/60">{value.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-muted/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Our Team
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Meet the Experts Behind ArFlash
            </p>
            <p className="mt-6 text-lg leading-8 text-foreground/60">
              Our team brings together decades of experience in blockchain,
              security, and financial technology.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary">{member.role}</p>
                  <p className="mt-2 text-sm text-foreground/60">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}