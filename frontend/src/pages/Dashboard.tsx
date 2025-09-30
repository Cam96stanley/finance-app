import { useEffect, useState } from 'react';
import { OverviewCard } from '../components';
import { overviewTotals } from '../api/overviewApi';

export type OverviewDataType = {
  balance: number;
  income: number;
  expenses: number;
};

export const Dashboard = () => {
  const [overviewData, setOverviewData] = useState<OverviewDataType>({
    balance: 0,
    income: 0,
    expenses: 0,
  });

  useEffect(() => {
    const fetchTotals = async () => {
      const data = await overviewTotals();
      setOverviewData(data);
    };

    fetchTotals();
  }, []);

  return (
    <>
      <p className="font-bold p-4 text-2xl">Overview</p>
      <div className="flex flex-col p-4 gap-4 md:flex-row">
        <OverviewCard label="Current Balance" value={overviewData.balance} />
        <OverviewCard label="Income" value={overviewData.income} />
        <OverviewCard label="Expenses" value={overviewData.expenses} />
      </div>
    </>
  );
};
