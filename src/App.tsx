import { OffCanvasProvider } from '@/context/OffCanvasContext';
import { UserProvider } from '@/context/UserContext';
import { UIProvider } from '@/context/UIContext';
import { FetchProvider } from '@/context/FetchContext';
import { MiscProvider } from '@/context/MiscContext';
import FaecesRouter from '@/routes/router';
import {WebProviders} from '@/lib/WebProviders.jsx';

// Import your pages explicitly

export const appName = 'Dehta';
export const advisorName = "Dehta";
// live 
export const appUrl =  "https://dehta.tech"
export const advisorUrl = "https://dehta.tech";
export const apiUrl = "https://api.dehta.tech";


// dev
// export const appUrl = "http://localhost:3000";
// export const advisorUrl = 'http://localhost:3000';
// export const apiUrl = "http://localhost:8000";

export const date = (): number => { return new Date().getFullYear() }
// export const wc_projectId = '1af94f6197a84bb9b0bbf205a8e25fb0';
export const saleWallet = '0x1cf1b22dafe0d2c3e10979054b7154a6cd81ba3b';
export const coinrankingApiKey = 'coinrankinga66957141a09518a2c111bd27765b8a77ea9f88ca5ed2bab'

const App = () => {

  return (
      <MiscProvider>
      <WebProviders>
      <UserProvider>
      <UIProvider>
      <FetchProvider>
        <OffCanvasProvider>
          <FaecesRouter/>
        </OffCanvasProvider>
      </FetchProvider>
      </UIProvider>
      </UserProvider>
      </WebProviders>
      </MiscProvider>
  );
};

export default App