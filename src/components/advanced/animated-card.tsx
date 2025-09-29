"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

type Props = React.ComponentProps<"div">;

export function AnimatedCard({ children, className, ...props }: Props) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Card className={className} {...props}>
        <CardContent>{children}</CardContent>
      </Card>
    </motion.div>
  );
}
