import { Spotlight } from "@/components/ui/spotlight";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-neutral/40 flex h-screen w-full items-center justify-center">
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="purple"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
