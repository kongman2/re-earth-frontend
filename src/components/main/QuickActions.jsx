// re-earth-frontend/src/components/main/QuickActions.jsx
import { useNavigate } from "react-router-dom";
import ArrowIcon from "../common/ArrowIcon";
import "./QuickActions.scss";

const QUICK_ITEMS = [
  {
    title: "인증하기",
    sub: "나의 작은 루틴이 지구를 바꿔요",
    color: "#FFCE55",
    className: "action-certify",
    path: "/saving/info",
  },
  {
    title: "기부하기",
    sub: "버리면 쓰레기, 기부하면 포인트",
    color: "#72C63A",
    className: "action-donate",
    path: "/donate/info",
  },
  {
    title: "쇼핑하기",
    sub: "착한 소비 루프, 여기서 완성",
    color: "#5EA8E0",
    className: "action-shop",
    path: "/pointshop",
  },
  {
    title: "커뮤니티",
    sub: "혼자가 아닌, 함께여서 더 즐겁다",
    color: "#FB6E52",
    className: "action-community",
    path: "/readysoon",
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="col-md-6">
      <div className="quick-actions">
        <div className="row">
          {QUICK_ITEMS.map((item, idx) => (
            <div className="col-md-6 col-6 mb-3" key={idx}>
              <div
                className={`card h-100 border-0 quick-action-card ${item.className}`}
                onClick={() => handleCardClick(item.path)}
                style={{ cursor: "pointer" }}
              >
                <div className="card-body">
                  <div className="action-content">
                    <h6 className="action-title">{item.title}</h6>
                    <p className="action-description">{item.sub}</p>
                  </div>
                  <div className="action-icon">
                    <ArrowIcon variant="simple" size={32} color={item.color} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
