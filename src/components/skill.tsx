import { BaggageClaim, ShoppingCart } from "lucide-react";
import bg from "./../assets/soft-grey-gradient-bg.png?url";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export function Skill() {
  return (
    <Card className="overflow-hidden">
      <CardHeader
        className="bg-cover h-54"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <CardContent className="flex justify-between bg-primary/5">
        <div>
          <h5 className="text-md font-medium">UX UI Design</h5>
          <span className="text-primary/45 text-sm">Description</span>
        </div>
        <div>
          <Badge variant="default">Production Design</Badge>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="flex gap-2">
          <Badge variant="outline" className="rounded-md gap-1.5 py-1.5 px-2.5">
            <ShoppingCart />
            Skill
          </Badge>
          <Badge variant="outline" className="rounded-md gap-1.5 py-1.5 px-2.5">
            <BaggageClaim />
            Skill
          </Badge>
        </div>
        <span className="font-medium">Learn More</span>
      </CardFooter>
    </Card>
  );
}
