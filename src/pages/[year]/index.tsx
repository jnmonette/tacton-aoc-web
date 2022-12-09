import { PageWrapper } from '../../lib/components';
import { getLeaderboard } from '../../lib/leaderboard'
import { getAllReports } from '../../lib/reports'
import { getAllGraphs } from '../../lib/graphs'

export default function Page({leaderboard, year}) {
  const reports = getAllReports(leaderboard);
  const graphs = getAllGraphs(leaderboard);

  return (
    <PageWrapper title="Tacton AoC Web">

        <h1>Welcome to the {year} Tacton AoC Web!</h1>

        <ul id="years">
            {[2015,2016,2017,2018,2019,2020,2021,2022].map(y=>(
                <li className={year==y?'active':''} key={y}><a href={`/${y}`}>{y}</a></li>
            ))}
        </ul>


        { reports.map(report => (
            <div key={report.title}>
              {report.title}
              <table>
              <thead>
                  <tr>
                    {report.columns.map(col => (<th key={col}>{col}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {report.lines.map(line=>(
                    <tr key={line.join("-")}>
                    {line.map(cell => (<td key={cell}>{cell}</td>))}
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
        ))}
        { graphs.map(graph => (
            <>
                {graph.title}
                <img width="760" src={graph.dataurl} />
            </>
        ))}

    </PageWrapper>
  )
}

export async function getServerSideProps(context) {
  const { year } = context.query;

  const leaderboard = await getLeaderboard(year)
  return { props: { leaderboard, year } }
}