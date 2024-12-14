
import ArticleHealth from "@/app/ui/zdrowie/article-health";
import TilesHealth from "@/app/ui/zdrowie/tiles-health";

export default function Page() {
  const articleData = {
    id: 1,
    name: "John Brown",
    avatar_img_url: "/avatars/avatar1.png",
    route_img_url: "/zdrowie/articles/Salmorejo.png",
    ingrediends: `- 3-4 pieczone buraki
- 2 gruszki (np. konferencja)
- 50 g orzechów włoskich
- 100 g sera koziego
- 3-4 garści rukoli
- 2 łyżki oliwy z oliwek
- 1 łyżeczka miodu
- 1 łyżeczka musztardy Dijon
- 1 łyżeczka octu balsamicznego
- Sól, pieprz do smaku
`,
    recipe: `- Buraki umyj i nie obierając ich, zawiń każdy w folię aluminiową. Piecz w piekarniku w temperaturze 200°C przez około 50-60 minut.  Po upieczeniu i ostygnięciu obierz je i pokrój w cienkie plastry lub kostkę.
- Gruszki umyj i również pokrój na plasterki lub w kostkę. Orzechy włoskie można podprażyć na suchej patelni przez kilka minut, by wydobyć ich cały aromat.
- Na rukolę wykładamy buraki, gruszkę, posypujemy pokruszonymi orzechami włoskimi oraz kozim serem oraz polewamy sosem vinaigrette.`,
  };

  return (
    <div className="flex flex-col md:flex-col gap-4 md:overflow-hidden">
      <TilesHealth />
      <div className="flex flex-col gap-4">
        <ArticleHealth articleData={articleData}/>
        <ArticleHealth articleData={articleData}/>
        <ArticleHealth articleData={articleData}/>
      </div>
    </div>
  );
}
