interface BetDataDetails {
  id: string;
  startTime: string;
}

interface BetData {
  id: string;
  upcoming: BetDataDetails[];
  results: BetDataDetails[];
}

interface GameDetailsData {
  id: string;
  name: string;
  startTime: string;
  number: number;
  starts: Race[];
}

export interface Race {
  id: string;
  driver: {
    firstName: string;
    lastName: string;
  };
  horse: {
    id: string;
    name: string;
    pedigree: {
      father: {
        name: string;
      };
    };
    trainer: {
      firstName: string;
      lastName: string;
    };
  };
  number: number;
}

export interface State {
  selectedBetType: string;
  betData: BetData;
  gameDetailsData: GameDetailsData[];
  gameSelected: string;
  showHorseDetailsIndex: string;
  loading: boolean;
  error: string | null;
}
