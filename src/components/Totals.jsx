import '../css/totals.css'

const totals = [
  { entry: 1000.00, discharge:-500.00, total:1500.00 ,result:'utilida',branch_id:1,date_id:1, id:1},
  { entry: 1000.00, discharge:-500.00, total:1500.00 ,result:'utilida',branch_id:2,date_id:1 , id:2},
  { entry: 1000.00, discharge:-500.00, total:1500.00 ,result:'utilida',branch_id:1,date_id:2 , id:3},
  { entry: 1000.00, discharge:-500.00, total:1500.00 ,result:'utilida',branch_id:2,date_id:2 , id:4},
  { entry: 1000.00, discharge:-500.00, total:1500.00 ,result:'utilida',branch_id:1,date_id:3 , id:5},
  { entry: 1000.00, discharge:-500.00, total:1500.00 ,result:'utilida',branch_id:2,date_id:3 , id:6},
  
]
const dates=[
  {date:'2023-8-9', id:1},
  {date:'2023-8-8', id:2},
  {date:'2023-8-7', id:3}
];

export const Totals = () => {

  const totalsU = totals.filter((total)=> total.branch_id ==1);
  const totalsT = totals.filter((total)=> total.branch_id ==1);
  return (
    <div >
      <div className="boxBranch">
        <h1>Uruapan</h1>
          {
            totalsU.map((totla)=>(
              <div key={totla.id} >
                <dir>
                  <h3>{String(dates.filter((date)=>date.id == totla.date_id))}</h3>
                </dir>
              </div>
            ))
          }
      </div>
      <div className="boxBranch">
        <h1>Tinguindin</h1>
      </div>
    </div>
  )
}
