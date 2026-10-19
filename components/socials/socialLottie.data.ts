import githubAnimation from "@/assets/lottie/socials/github.json";
import linkedinAnimation from "@/assets/lottie/socials/linkedin.json";
import xAnimation from "@/assets/lottie/socials/x.json";
import mailAnimation from "@/assets/lottie/socials/mail.json";

export const socialLottieAnimations = {
  github: githubAnimation,
  linkedin: linkedinAnimation,
  twitter: xAnimation,
  mail: mailAnimation,
} as const;

export type SocialAnimationKey = keyof typeof socialLottieAnimations;
