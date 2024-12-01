"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare } from "lucide-react";
import { useConnection } from "arweave-wallet-kit";
import { useState } from "react";
import { toast } from "sonner";
import { createDataItemSigner, message, result } from "@permaweb/aoconnect";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    description: "We are here to help",
    contact: "20yashs09@gmail.com",
  },
];

function concatenateStrings(...strings: string[]): string {
  return strings.join(" ");
}

export default function ContactPage() {
  const { connected } = useConnection();
  const [isPosting, setIsPosting] = useState(false);

  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const processId = "sIrL7NuKoh8iIL9OAgNdmLcMnRG0NYz0bcp3gi9H6HY";

  // Function to send description
  const sendDescription = async () => {
    if (connected) {
      // Create draft content with name, email, subject, and description
      const draftContent = concatenateStrings(
        "Name: ",
        name,
        "\n",
        "Email: ",
        email,
        "\n",
        "Subject: ",
        subject,
        "\n",
        "Description: ",
        description
      );

      setIsPosting(true);

      try {
        const response = await message({
          process: processId,
          signer: createDataItemSigner(window.arweaveWallet),
          data: draftContent,
        });
        const postResult = await result({
          process: processId,
          message: response,
        });
        console.log("Post result:", postResult);
        toast.success("Query sent successfully!");
      } catch (error) {
        console.error("Error sending description:", error);
        toast.error("Failed to send query. Please try again.");
      } finally {
        setIsPosting(false);
      }

      // Clear form fields
      setName("");
      setEmail("");
      setSubject("");
      setDescription("");
    } else {
      toast.error("Please connect your wallet to send a query");
    }
  };

  return (
    <main className="flex-1">
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Contact Us
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Get in Touch
            </p>
            <p className="mt-6 text-lg leading-8 text-foreground/60">
              Have questions? We'd love to hear from you. Send us a Query and
              we'll respond as soon as possible.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
            <div className="flex flex-col items-center justify-center">
              {contactMethods.map((method) => (
                <Card key={method.title} className="bg-muted/50">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <method.icon className="h-8 w-8 text-primary mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        {method.title}
                      </h3>
                      <p className="text-sm text-foreground/60 mb-2">
                        {method.description}
                      </p>
                      <p className="text-sm font-semibold">{method.contact}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Send us a description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-6"
                  onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium mb-2">
                      Description
                    </label>
                    <Textarea
                      id="description"
                      placeholder="Your description..."
                      rows={6}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">
                      Please provide as much detail as possible so we can best
                      assist you.
                    </p>
                  </div>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      sendDescription();
                    }}
                    className="w-full sm:w-auto">
                    Send description
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
