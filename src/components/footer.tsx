import { Mail, Phone } from "lucide-react";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 h-80">
      <h3 className="text-md text-primary/45">CONTACT</h3>
      <h1 className="text-3xl font-medium">Let's work together</h1>
      <div className="flex gap-4">
        <Button
          variant="default"
          className="text-lg rounded-3xl has-[>svg]:px-8 py-6"
        >
          <Phone className="text-lg" />
          WhatsApp
        </Button>
        <Button
          variant="outline"
          className="text-lg rounded-3xl has-[>svg]:px-8 py-6"
        >
          <Mail className="text-lg" />
          Email
        </Button>
      </div>
    </section>
  );
}
