export const data = {
  "nodes": [
    {"id": "1", "label": "General region", "imageUrl": "../../../../assets/image/user.svg", "x": 100, "y": 100},
    {"id": "2", "label": "AKTTest Role", "imageUrl": "../../../../assets/image/eye.svg", "x": 300, "y": 100},
    {"id": "3", "label": "AKTTest Role", "imageUrl": "../../../../assets/image/chat.svg", "x": 300, "y": 300},
    {"id": "4", "label": "Administrator", "imageUrl": "../../../../assets/image/marketplace.svg", "x": 300, "y": 500},
    {"id": "5", "label": "Image of Lambdas", "imageUrl": "../../../../assets/image/settings.svg", "x": 600, "y": 100},
    {"id": "6", "label": "Icon Sage Maker", "imageUrl": "../../../../assets/image/notifications.svg", "x": 600, "y": 300},
    {"id": "7", "imageUrl": "../../../../assets/image/user.svg", "x": 800, "y": 100},
    {"id": "8", "label": "Akshay", "imageUrl": "../../../../assets/image/user.svg", "x": 600, "y": 500},

  ],
  "edges": [
    {"id": "e1", "source": "1", "target": "2"},
    {"id": "e2", "source": "1", "target": "3"},
    {"id": "e3", "source": "1", "target": "4"},
    {"id": "e4", "label": "Used By", "source": "2", "target": "5"},
    {"id": "e5", "label": "Used By", "source": "2", "target": "6"},
    {"id": "e6", "source": "5", "target": "6"},
    {"id": "e7", "source": "5", "target": "7"},
    {"id": "e8", "label": "Assigned to", "source": "4", "target": "8"},
  ]
};
