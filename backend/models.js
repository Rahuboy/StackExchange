import { Sequelize } from "sequelize";
import db from "./conn.js";

const { DataTypes } = Sequelize;

export const Credential = db.define("credentials", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    user_name : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false
    },
    access_token : {
        type: DataTypes.STRING
    }
},{
    freezeTableName: true,
    timestamps: false,
});

export const User = db.define("users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    account_id: {
        type: DataTypes.INTEGER
    },
    reputation: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    views: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    down_votes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    up_votes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    display_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING
    },
    profile_image_url: {
        type: DataTypes.STRING
    },
    website_url: {
        type: DataTypes.STRING
    },
    about_me: {
        type: DataTypes.TEXT
    },
    creation_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    last_access_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
},{
  freezeTableName: true,
  timestamps: false,
});

export const Post = db.define("posts", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    owner_user_id: {
        type: DataTypes.INTEGER
    },
    last_editor_user_id: {
        type: DataTypes.INTEGER
    },
    post_type_id: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    accepted_answer_id: {
        type: DataTypes.INTEGER
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    parent_id: {
        type: DataTypes.INTEGER
    },
    view_count: {
        type: DataTypes.INTEGER
    },
    answer_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    comment_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    owner_display_name: {
        type: DataTypes.STRING
    },
    last_editor_display_name: {
        type: DataTypes.STRING
    },
    title: {
        type: DataTypes.STRING
    },
    tags: {
        type: DataTypes.STRING
    },
    content_license: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT
    },
    favorite_count: {
        type: DataTypes.INTEGER
    },
    creation_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    community_owned_date: {
        type: DataTypes.DATE
    },
    closed_date: {
        type: DataTypes.DATE
    },
    last_edit_date: {
        type: DataTypes.DATE
    },
    last_activity_date: {
        type: DataTypes.DATE
    }
},{
    freezeTableName: true,
    timestamps: false,
});

export const PostLink = db.define("post_links", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    related_post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    link_type_id: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    creation_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false,
});

export const PostHistory = db.define("post_history", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    post_history_type_id: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    user_display_name: {
        type: DataTypes.STRING
    },
    content_license: {
        type: DataTypes.STRING,
        allowNull: false
    },
    revision_guid: {
        type: DataTypes.STRING
    },
    text: {
        type: DataTypes.TEXT
    },
    comment: {
        type: DataTypes.TEXT
    },
    creation_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false,
});

export const Comment = db.define("comments", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    score: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    content_license: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_display_name: {
        type: DataTypes.STRING
    },
    text: {
        type: DataTypes.TEXT
    },
    creation_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false,
});

export const Vote = db.define("votes", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vote_type_id: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    bounty_amount: {
        type: DataTypes.TINYINT
    },
    creation_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false,
});

export const Badge = db.define("badges", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    class: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tag_based: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false,
});

export const Tag = db.define("tags", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    excerpt_post_id: {
        type: DataTypes.INTEGER
    },
    wiki_post_id: {
        type: DataTypes.INTEGER
    },
    tag_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
},{
    freezeTableName: true,
    timestamps: false,
});

