import Layout from "@/components/layout/Layout";
import { Switch, Route, Router as WouterRouter } from "wouter";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Datasets from "@/pages/Datasets";
import Developers from "@/pages/Developers";
import Docs from "@/pages/Docs";
import About from "@/pages/About";
import Careers from "@/pages/Careers";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/datasets" component={Datasets} />
        <Route path="/developers" component={Developers} />
        <Route path="/docs" component={Docs} />
        <Route path="/about" component={About} />
        <Route path="/careers" component={Careers} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "") || ""}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
