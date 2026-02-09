import { BookOpen } from "lucide-react";
import { useState } from "react";
import { Theme } from "../theme";
import bg from "../assets/soft-grey-gradient-bg.png?url";
import { Button } from "./ui/button";
import { Icon } from "./ui/icon";

export function Header() {
  const [translation, setTranslation] = useState(false);

  return (
    <header
      className="flex items-start justify-between p-5 bg-cover h-80 mx-6 mt-6 rounded-xl"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div>
        <h3 className="text-xl font-medium">JOSÉ RIBEIRO</h3>
        <h5 className="text-md text-primary/50">UX UI Design</h5>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="w-min-10.5">
          <BookOpen />
          BLOG
        </Button>
        <Button variant="outline" className="w-10.5">
          <Icon icon="behance" />
        </Button>
        <Button variant="outline" className="w-10.5">
          <Icon icon="linkedin" />
        </Button>
        <Button
          variant="outline"
          onClick={() => setTranslation(!translation)}
          className="w-10.5"
        >
          {translation ? "EN" : "PT"}
        </Button>
        <Theme.Switch />
      </div>
    </header>
  );
}
