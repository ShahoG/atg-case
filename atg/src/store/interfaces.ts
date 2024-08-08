interface BetData {
  id: string;
}

interface GameDetailsData {
  id: string;
  name: string;
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
  betData: BetData[];
  gameDetailsData: GameDetailsData[];
  showHorseDetailsIndex: string;
  loading: boolean;
  error: string | null;
}
