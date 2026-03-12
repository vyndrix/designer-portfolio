import { BaggageClaim, ShoppingCart } from "lucide-react";
import { useTheme } from "../theme";
import bgDark from "./../assets/soft-grey-gradient-bg-dark.png?url";
import bgLight from "./../assets/soft-grey-gradient-bg.png?url";
import Flipper from "./flipper";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

interface Props {
  name: string;
  description: string;
}

export function Skill({ name, description }: Props) {
  const { theme } = useTheme();

  return (
    <Flipper>
      <Flipper.Front>
        <Card className="overflow-hidden">
          <CardHeader
            className="bg-cover h-54"
            style={{
              backgroundImage: `url(${theme === "dark" ? bgDark : bgLight})`,
            }}
          />
          <CardContent className="flex justify-between bg-background/80">
            <div>
              <h5 className="text-md font-medium">{name}</h5>
              <span className="text-sm">{description}</span>
            </div>
            <div>
              <Badge variant="ze">Production Design</Badge>
            </div>
          </CardContent>
          <CardFooter className="justify-between bg-background">
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className="rounded-md gap-1.5 py-1.5 px-2.5"
              >
                <ShoppingCart />
                Skill
              </Badge>
              <Badge
                variant="outline"
                className="rounded-md gap-1.5 py-1.5 px-2.5"
              >
                <BaggageClaim />
                Skill
              </Badge>
            </div>
            <span className="font-medium">Learn More</span>
          </CardFooter>
        </Card>
      </Flipper.Front>
      <Flipper.Back>
        <Card className="overflow-hidden">
          <CardHeader
            className="bg-cover h-54"
            style={{
              backgroundImage: `url(${theme === "dark" ? bgDark : bgLight})`,
            }}
          />
          <CardContent className="flex justify-between bg-background/80">
            <div>
              <h5 className="text-md font-medium">{name}</h5>
              <span className="text-sm">{description}</span>
            </div>
            <div>
              <Badge variant="ze">Production Design Facedown</Badge>
            </div>
          </CardContent>
          <CardFooter className="justify-between bg-background">
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className="rounded-md gap-1.5 py-1.5 px-2.5"
              >
                <ShoppingCart />
                Skill Facedown
              </Badge>
              <Badge
                variant="outline"
                className="rounded-md gap-1.5 py-1.5 px-2.5"
              >
                <BaggageClaim />
                Skill Facedown
              </Badge>
            </div>
            <span className="font-medium">Learn More Facedown</span>
          </CardFooter>
        </Card>
      </Flipper.Back>
    </Flipper>
  );

  // useEventListener(
  //   "mouseenter",
  //   async () => {
  //     await animate(
  //       ".flipper-front",
  //       { scale: 1.1, rotateY: "90deg", zIndex: 20 },
  //       {
  //         duration: 0.2,
  //         ease: [1, 0.2, 0, 0.4],
  //       },
  //     );
  //     await animate(
  //       ".flipper-back",
  //       { scale: 1.2, rotateY: "0deg", zIndex: 20 },
  //       {
  //         duration: 0.2,
  //         ease: [0.4, 0, 0.2, 1],
  //       },
  //     );
  //   },
  //   hoverRef,
  // );

  // useEventListener(
  //   "mouseleave",
  //   async () => {
  //     await animate(
  //       ".flipper-back",
  //       { scale: 1, rotateY: "90deg", zIndex: 10 },
  //       {
  //         duration: 0.2,
  //         ease: [1, 0.2, 0, 0.4],
  //       },
  //     );
  //     await animate(
  //       ".flipper-front",
  //       { scale: 1, rotateY: "0deg", zIndex: 10 },
  //       {
  //         duration: 0.2,
  //         ease: [0.4, 0, 0.2, 1],
  //       },
  //     );
  //   },
  //   hoverRef,
  // );

  // return (
  //   <motion.div
  //     ref={hoverRef}
  //     className="scope"
  //     style={{ position: "relative" }}
  //   >
  //     {/* <motion.div ref={ref1}> */}
  //     <motion.div className="flipper-front">
  //       <Card className="overflow-hidden">
  //         <CardHeader
  //           className="bg-cover h-54"
  //           style={{
  //             backgroundImage: `url(${theme === "dark" ? bgDark : bgLight})`,
  //           }}
  //         />
  //         <CardContent className="flex justify-between bg-background/80">
  //           <div>
  //             <h5 className="text-md font-medium">{name}</h5>
  //             <span className="text-sm">{description}</span>
  //           </div>
  //           <div>
  //             <Badge variant="ze">Production Design</Badge>
  //           </div>
  //         </CardContent>
  //         <CardFooter className="justify-between bg-background">
  //           <div className="flex gap-2">
  //             <Badge
  //               variant="outline"
  //               className="rounded-md gap-1.5 py-1.5 px-2.5"
  //             >
  //               <ShoppingCart />
  //               Skill
  //             </Badge>
  //             <Badge
  //               variant="outline"
  //               className="rounded-md gap-1.5 py-1.5 px-2.5"
  //             >
  //               <BaggageClaim />
  //               Skill
  //             </Badge>
  //           </div>
  //           <span className="font-medium">Learn More</span>
  //         </CardFooter>
  //       </Card>
  //     </motion.div>
  //     {/* <motion.div
  //       ref={ref2}
  //       style={{ position: "absolute", rotateY: "90deg", top: 0, left: 0 }}
  //     > */}
  //     <motion.div
  //       className="flipper-back"
  //       style={{ position: "absolute", rotateY: "90deg", top: 0, left: 0 }}
  //     >
  //       <Card className="overflow-hidden">
  //         <CardHeader
  //           className="bg-cover h-54"
  //           style={{
  //             backgroundImage: `url(${theme === "dark" ? bgDark : bgLight})`,
  //           }}
  //         />
  //         <CardContent className="flex justify-between bg-background/80">
  //           <div>
  //             <h5 className="text-md font-medium">{name}</h5>
  //             <span className="text-sm">{description}</span>
  //           </div>
  //           <div>
  //             <Badge variant="ze">Production Design Facedown</Badge>
  //           </div>
  //         </CardContent>
  //         <CardFooter className="justify-between bg-background">
  //           <div className="flex gap-2">
  //             <Badge
  //               variant="outline"
  //               className="rounded-md gap-1.5 py-1.5 px-2.5"
  //             >
  //               <ShoppingCart />
  //               Skill Facedown
  //             </Badge>
  //             <Badge
  //               variant="outline"
  //               className="rounded-md gap-1.5 py-1.5 px-2.5"
  //             >
  //               <BaggageClaim />
  //               Skill Facedown
  //             </Badge>
  //           </div>
  //           <span className="font-medium">Learn More Facedown</span>
  //         </CardFooter>
  //       </Card>
  //     </motion.div>
  //   </motion.div>
  // );
}
