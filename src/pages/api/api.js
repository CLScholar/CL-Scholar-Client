import React from 'react';
import { Container } from 'reactstrap';
import './api.css';

const ApiHelp = () => {
  return (
    <div>
      <Container>
        <h2 className="my-2 py-4 text-center">API Documentation</h2>
        <h4>Overview</h4>
        <p>
          The CL Scholar API provides access to all the papers, authors and
          conferences within the Computational Linguistics Community.
        </p>
        <h4>Schema</h4>
        <p>
          All API access is over HTTP, and accessed from
        </p>
        <pre className="command-code">
          <span>http://cnerg.iitkgp.ac.in/aclapi/api</span>
        </pre>
        <p>
          All data is sent and received as JSON.
        </p>
        <h4>Endpoints</h4>
        <h5>Papers</h5>
        <p>
          Here paper ID is for the original paper ID assigned to the paper
        </p>
        <pre className="command-code">
          <span>GET /paper/:paper-id</span>
        </pre>
        <p>
          An example for above endpoint is
        </p>
        <pre className="command-code">
          <span>GET /paper/A00-1002</span>
        </pre>
        <p>Response: </p>
        <pre className="command-code">
          <span>{JSON.stringify({
          	"year": 2000,
          	"sentiment_score": 0.5,
          	"citation_trend": [
          		{
          			"year": 2005,
          			"citation": 1
          		},
          		{
          			"year": 2006,
          			"citation": 1
          		},
          		{
          			"year": 2009,
          			"citation": 2
          		},
          		{
          			"year": 2011,
          			"citation": 1
          		},
          		{
          			"year": 2012,
          			"citation": 2
          		},
          		{
          			"year": 2013,
          			"citation": 5
          		},
          		{
          			"year": 2014,
          			"citation": 4
          		},
          		{
          			"year": 2015,
          			"citation": 1
          		}
          	],
          	"conference": "ANLP",
          	"topics": [
          		"0",
          		"13",
          		"14",
          		"9",
          		"4",
          		"6"
          	],
          	"conference_id": 1,
          	"paper_id": "A00-1002",
          	"abstract": "Using examples of the transfer-based MT system between Czech and Russian RUSLAN and the word-for-word MT system with morphological disambiguation between Czech and Slovak (~ESILKO we argue that for really close languages it is possible to obtain better translation quality by means of simpler methods. The problem of translation to a group of typologically similar languages using a pivot language is also discussed here.",
          	"title": "Machine Translation of Very Close Languages",
          	"summary": "The shallow parsing machine translation architecture is suitable for the translation systems for related lan- guages as shown in [5, 15]. Authors [12] and the authors of translation systems for related languages Apertium [5] and [11] suggest using an archi- tecture similar to the one presented in 1. This architecture employs statistical part of speech (POS) tagger for disambiguation of the morphological anal- ysis of the source language.",
          	"citations": 18,
          	"affiliations": [
          		"computer science dept johns hopkins charles st baltimore md usa"
          	],
          	"authors": [
          		{
          			"id": 2,
          			"name_list": [
          				"jan hajic"
          			]
          		}
          	],
          	"urls": [],
          	"citing": [],
          	"cocited": [],
          	"cited": [
          		"E06-1047",
          		"W11-2602",
          		"D09-1141",
          		"P13-2001",
          		"C12-3048",
          		"D12-1027",
          		"P13-2073",
          		"H05-1110",
          		"I13-1167",
          		"P15-2021",
          		"W14-4212",
          		"W14-4605",
          		"R13-1088",
          		"W13-2702",
          		"D14-1145",
          		"D14-1112",
          		"R09-1082"
          	 ]
            }, null, 3)}
          </span>
        </pre>
        <h5>Finding Authors</h5>
        <p>
          This endpoint requires a required parameter of name
        </p>
        <pre className="command-code">
          <span>GET /authors?name=:name</span>
        </pre>
        <p>
          An example for above endpoint is
        </p>
        <pre className="command-code">
          <span>GET /authors?name=christo</span>
        </pre>
        <p>Response: </p>
        <pre className="command-code">
          <span>{JSON.stringify([
            	{
            		"author_id": 8544,
            		"name_list": [
            			"christopher pinchak"
            		]
            	},
            	{
            		"author_id": 9753,
            		"name_list": [
            			"christophe savariaux"
            		]
            	},
            	{
            		"author_id": 9945,
            		"name_list": [
            			"christopher carignan"
            		]
            	},
            	{
            		"author_id": 25323,
            		"name_list": [
            			"christopher thomas"
            		]
            	},
            	{
            		"author_id": 24447,
            		"name_list": [
            			"christoph m. friedrich"
            		]
            	},
            	{
            		"author_id": 25478,
            		"name_list": [
            			"fenia christopoulou"
            		]
            	},
            	{
            		"author_id": 20603,
            		"name_list": [
            			"christopher h. lin"
            		]
            	},
            	{
            		"author_id": 30487,
            		"name_list": [
            			"christopher antoun"
            		]
            	},
            	{
            		"author_id": 32393,
            		"name_list": [
            			"christopher hench"
            		]
            	},
            	{
            		"author_id": 23318,
            		"name_list": [
            			"christophe gravier"
            		]
            	},
            	{
            		"author_id": 10281,
            		"name_list": [
            			"christophe dany"
            		]
            	},
            	{
            		"author_id": 23553,
            		"name_list": [
            			"christopher hidey"
            		]
            	},
            	{
            		"author_id": 29580,
            		"name_list": [
            			"christopher m. mitchell",
            			"christopher mitchell"
            		]
            	},
            	{
            		"author_id": 3693,
            		"name_list": [
            			"christoph boden"
            		]
            	},
            	{
            		"author_id": 6194,
            		"name_list": [
            			"christopher laenzlinger"
            		]
            	}
            ], null, 3)}
          </span>
        </pre>
        <h5>Single Author</h5>
        <p>
          Here author-id is the unique ID given by us for each author. The ID
          can be found by search using the above endpoint
        </p>
        <pre className="command-code">
          <span>GET /authors/:author-id</span>
        </pre>
        <p>
          An example for above endpoint is
        </p>
        <pre className="command-code">
          <span>GET /authors/5</span>
        </pre>
        <p>Response: </p>
        <pre className="command-code">
          <span>{JSON.stringify({
          	"Yearwise_Citation": [
          		{
          			"year": 2002,
          			"number": 1
          		},
          		{
          			"year": 2004,
          			"number": 1
          		},
          		{
          			"year": 2006,
          			"number": 1
          		},
          		{
          			"year": 2009,
          			"number": 5
          		},
          		{
          			"year": 2010,
          			"number": 5
          		},
          		{
          			"year": 2011,
          			"number": 2
          		},
          		{
          			"year": 2012,
          			"number": 8
          		},
          		{
          			"year": 2013,
          			"number": 6
          		},
          		{
          			"year": 2014,
          			"number": 4
          		},
          		{
          			"year": 2015,
          			"number": 8
          		},
          		{
          			"year": 2016,
          			"number": 24
          		}
          	],
          	"Yearwise_Publication": [
          		{
          			"year": 1995,
          			"number": 1
          		},
          		{
          			"year": 1998,
          			"number": 1
          		},
          		{
          			"year": 2000,
          			"number": 1
          		},
          		{
          			"year": 2003,
          			"number": 1
          		},
          		{
          			"year": 2006,
          			"number": 3
          		},
          		{
          			"year": 2008,
          			"number": 2
          		},
          		{
          			"year": 2009,
          			"number": 1
          		},
          		{
          			"year": 2010,
          			"number": 4
          		},
          		{
          			"year": 2011,
          			"number": 1
          		},
          		{
          			"year": 2012,
          			"number": 1
          		},
          		{
          			"year": 2015,
          			"number": 2
          		}
          	],
          	"hindex": [
          		{
          			"year": 2002,
          			"index": 1
          		},
          		{
          			"year": 2004,
          			"index": 1
          		},
          		{
          			"year": 2006,
          			"index": 1
          		},
          		{
          			"year": 2009,
          			"index": 2
          		},
          		{
          			"year": 2010,
          			"index": 3
          		},
          		{
          			"year": 2011,
          			"index": 3
          		},
          		{
          			"year": 2012,
          			"index": 4
          		},
          		{
          			"year": 2013,
          			"index": 4
          		},
          		{
          			"year": 2014,
          			"index": 4
          		},
          		{
          			"year": 2015,
          			"index": 4
          		},
          		{
          			"year": 2016,
          			"index": 5
          		}
          	],
          	"topics": [
          		{
          			"1": 0.328734254798,
          			"6": 0.558765739723,
          			"year": 1995
          		},
          		{
          			"4": 0.0707233698917,
          			"6": 0.107266110392,
          			"10": 0.0968821410095,
          			"13": 0.0998500503138,
          			"16": 0.0851588205244,
          			"17": 0.0663624285748,
          			"18": 0.0976725320178,
          			"year": 1998
          		},
          		{
          			"0": 0.120627674869,
          			"4": 0.068944349283,
          			"6": 0.158060570904,
          			"9": 0.0716922581997,
          			"10": 0.121370380898,
          			"15": 0.221795346961,
          			"18": 0.0672832456191,
          			"year": 2000
          		},
          		{
          			"2": 0.1405532552,
          			"4": 0.27772145384,
          			"18": 0.342515121707,
          			"19": 0.150321279096,
          			"year": 2003
          		},
          		{
          			"3": 0.0695104450538,
          			"6": 0.13805683283,
          			"9": 0.0962736830922,
          			"10": 0.124778537059,
          			"11": 0.169519864827,
          			"12": 0.041638142751,
          			"14": 0.0530896156747,
          			"year": 2006
          		},
          		{
          			"0": 0.0552563963676,
          			"2": 0.0556265856383,
          			"8": 0.0762393725513,
          			"9": 0.0521954534833,
          			"10": 0.103028504903,
          			"14": 0.167419732827,
          			"18": 0.195748302331,
          			"year": 2008
          		},
          		{
          			"0": 0.123444555269,
          			"4": 0.0629375092145,
          			"6": 0.241319662607,
          			"9": 0.0665038286929,
          			"10": 0.104775299225,
          			"14": 0.14648575708,
          			"17": 0.0595866905433,
          			"year": 2009
          		},
          		{
          			"0": 0.124627163067,
          			"6": 0.0545097130256,
          			"8": 0.0649811866773,
          			"10": 0.0944731388356,
          			"13": 0.114005154734,
          			"14": 0.0556899332486,
          			"17": 0.0545810910379,
          			"year": 2010
          		},
          		{
          			"0": 0.105664308846,
          			"3": 0.0553690733765,
          			"11": 0.0955409129846,
          			"13": 0.063612928931,
          			"16": 0.0882290467932,
          			"17": 0.0938952256779,
          			"18": 0.104283552809,
          			"year": 2011
          		},
          		{
          			"0": 0.0665428631619,
          			"2": 0.0594125841269,
          			"6": 0.160434337406,
          			"10": 0.189787240949,
          			"16": 0.0633141823001,
          			"17": 0.0582677483465,
          			"18": 0.264452319899,
          			"year": 2012
          		},
          		{
          			"4": 0.161793205215,
          			"10": 0.0666333955374,
          			"12": 0.0681086532534,
          			"13": 0.0688485028249,
          			"14": 0.0799748301106,
          			"16": 0.0668262730721,
          			"18": 0.0805863426333,
          			"year": 2015
          		}
          	],
          	"author_id": 5,
          	"collaborators_list": [
          		{
          			"name": "guihong cao",
          			"score": 3,
          			"author_id": 1464
          		},
          		{
          			"name": "n. kando",
          			"score": 2,
          			"author_id": 2011
          		},
          		{
          			"name": "bernard brosseau-villeneuve",
          			"score": 2,
          			"author_id": 2010
          		},
          		{
          			"name": "florian boudin",
          			"score": 2,
          			"author_id": 1912
          		},
          		{
          			"name": "martin dawes",
          			"score": 2,
          			"author_id": 6790
          		},
          		{
          			"name": "jianfeng gao",
          			"score": 2,
          			"author_id": 1029
          		},
          		{
          			"name": "jing bai",
          			"score": 1,
          			"author_id": 2289
          		},
          		{
          			"name": "zhaohui zheng",
          			"score": 1,
          			"author_id": 2292
          		},
          		{
          			"name": "yi chang",
          			"score": 1,
          			"author_id": 2291
          		},
          		{
          			"name": "yuanhua lv",
          			"score": 1,
          			"author_id": 22138
          		},
          		{
          			"name": "rui yan",
          			"score": 1,
          			"author_id": 4437
          		},
          		{
          			"name": "xiaobo ren",
          			"score": 1,
          			"author_id": 5702
          		},
          		{
          			"name": "margaret mitchell",
          			"score": 1,
          			"author_id": 7360
          		},
          		{
          			"name": "pierre isabelle",
          			"score": 1,
          			"author_id": 5126
          		},
          		{
          			"name": "jing he",
          			"score": 1,
          			"author_id": 2804
          		},
          		{
          			"name": "pablo duboue",
          			"score": 1,
          			"author_id": 2805
          		},
          		{
          			"name": "hongling wang",
          			"score": 1,
          			"author_id": 2135
          		},
          		{
          			"name": "yangfeng ji",
          			"score": 1,
          			"author_id": 7265
          		},
          		{
          			"name": "donald metzler",
          			"score": 1,
          			"author_id": 20078
          		},
          		{
          			"name": "michel galley",
          			"score": 1,
          			"author_id": 6643
          		},
          		{
          			"name": "wei zhang",
          			"score": 1,
          			"author_id": 2268
          		},
          		{
          			"name": "jiang chen",
          			"score": 1,
          			"author_id": 4
          		},
          		{
          			"name": "stephen robertson",
          			"score": 1,
          			"author_id": 19859
          		},
          		{
          			"name": "michel simard",
          			"score": 1,
          			"author_id": 6365
          		},
          		{
          			"name": "alessandro sordoni",
          			"score": 1,
          			"author_id": 8041
          		},
          		{
          			"name": "junlin zhang",
          			"score": 1,
          			"author_id": 1460
          		},
          		{
          			"name": "michael auli",
          			"score": 1,
          			"author_id": 6915
          		},
          		{
          			"name": "martin brisebois",
          			"score": 1,
          			"author_id": 21717
          		},
          		{
          			"name": "zhifei zhang",
          			"score": 1,
          			"author_id": 25431
          		},
          		{
          			"name": "wessel kraaij",
          			"score": 1,
          			"author_id": 5539
          		},
          		{
          			"name": "wan chen",
          			"score": 1,
          			"author_id": 22140
          		},
          		{
          			"name": "le sun",
          			"score": 1,
          			"author_id": 1461
          		},
          		{
          			"name": "xiaoming li",
          			"score": 1,
          			"author_id": 3568
          		},
          		{
          			"name": "bill dolan",
          			"score": 1,
          			"author_id": 1406
          		},
          		{
          			"name": "ruiqiang zhang",
          			"score": 1,
          			"author_id": 1582
          		},
          		{
          			"name": "youssef kadri",
          			"score": 1,
          			"author_id": 11434
          		}
          	],
          	"papers": [
          		{
          			"paper_id": "N15-1020",
          			"paper_title": "A Neural Network Approach to Context-Sensitive Generation of Conversational Responses",
          			"citations": 25,
          			"paper_year": 2015,
          			"collab_auths": [
          				8041,
          				6643,
          				6915,
          				7265,
          				7360,
          				1029,
          				1406
          			],
          			"collab_authors": []
          		},
          		{
          			"paper_id": "N06-1059",
          			"paper_title": "An Information-Theoretic Approach to Automatic Evaluation of Summaries",
          			"citations": 11,
          			"paper_year": 2006,
          			"collab_auths": [
          				1464,
          				1029
          			],
          			"collab_authors": []
          		},
          		{
          			"paper_id": "D10-1011",
          			"paper_title": "Positional Language Models for Clinical Information Retrieval",
          			"citations": 8,
          			"paper_year": 2010,
          			"collab_auths": [
          				1912,
          				6790
          			],
          			"collab_authors": []
          		},
          		{
          			"paper_id": "J03-3003",
          			"paper_title": "Embedding Web-Based Statistical Translation Models in Cross-Language Information Retrieval",
          			"citations": 6,
          			"paper_year": 2003,
          			"collab_auths": [
          				5539,
          				6365
          			],
          			"collab_authors": []
          		},
          		{
          			"paper_id": "A00-1004",
          			"paper_title": "Automatic construction of parallel English-Chinese corpus for cross-language information retrieval",
          			"citations": 5,
          			"paper_year": 2000,
          			"collab_auths": [
          				4
          			],
          			"collab_authors": []
          		},
          		{
          			"paper_id": "D11-1124",
          			"paper_title": "Summarize What You Are Interested In: An Optimization Framework for Interactive Personalized Summarization",
          			"citations": 3,
          			"paper_year": 2011,
          			"collab_auths": [
          				4437,
          				3568
          			],
          			"collab_authors": []
          		},
          		{
          			"paper_id": "C10-1013",
          			"paper_title": "Towards an optimal weighting of context words based on distance",
          			"citations": 2,
          			"paper_year": 2010,
          			"collab_auths": [
          				2010,
          				2011
          			],
          			"collab_authors": []
          		},
          		{
          			"paper_id": "N10-1124",
          			"paper_title": "Clinical Information Retrieval using Document and PICO Structure",
          			"citations": 2,
          			"paper_year": 2010,
          			"collab_auths": [
          				1912,
          				6790
          			],
          			"collab_authors": []
          		},
          		{
          			"paper_id": "P08-1018",
          			"paper_title": "Selecting Query Term Alternations for Web Search by Exploiting Query Contexts",
          			"citations": 1,
          			"paper_year": 2008,
          			"collab_auths": [
          				1464,
          				19859
          			],
          			"collab_authors": []
          		},
          		{
          			"paper_id": "S10-1084",
          			"paper_title": "RALI: Automatic Weighting of Text Window Distances",
          			"citations": 1,
          			"paper_year": 2010,
          			"collab_auths": [
          				2010,
          				2011
          			],
          			"collab_authors": []
          		},
          		{
          			"paper_id": "W98-1103",
          			"paper_title": "Using a Probabilistic Translation Model for Cross-Language Information Retrieval",
          			"citations": 1,
          			"paper_year": 1998,
          			"collab_auths": [
          				5126
          			],
          			"collab_authors": []
          		},
          		{
          			"paper_id": "C12-1069",
          			"paper_title": "Bridging the Gap between Intrinsic and Perceived Relevance in Snippet Generation",
          			"citations": 0,
          			"paper_year": 2012,
          			"collab_auths": [
          				2804,
          				2805
          			],
          			"collab_authors": []
          		},
          		{
          			"paper_id": "S15-2131",
          			"paper_title": "TJUdeM: A Combination Classifier for Aspect Category Detection and Sentiment Polarity Classification",
          			"citations": 0,
          			"paper_year": 2015,
          			"collab_auths": [
          				25431,
          				2135
          			],
          			"collab_authors": []
          		},
          		{
          			"paper_id": "W06-1665",
          			"paper_title": "Context-Dependent Term Relations for Information Retrieval",
          			"citations": 0,
          			"paper_year": 2006,
          			"collab_auths": [
          				2289,
          				1464
          			],
          			"collab_authors": []
          		},
          		{
          			"paper_id": "N09-2042",
          			"paper_title": "Search Engine Adaptation by Feedback Control Adjustment for Time-sensitive Query",
          			"citations": 0,
          			"paper_year": 2009,
          			"collab_auths": [
          				1582,
          				2291,
          				2292,
          				20078
          			],
          			"collab_authors": []
          		},
          		{
          			"paper_id": "O95-1008",
          			"paper_title": "A Unifying Approach To Segmentation Of Chinese And Its Application To Text Retrieval",
          			"citations": 0,
          			"paper_year": 1995,
          			"collab_auths": [
          				5702,
          				21717
          			],
          			"collab_authors": []
          		},
          		{
          			"paper_id": "I08-1024",
          			"paper_title": "A Comparative Study for Query Translation using Linear Combination and Confidence Measure",
          			"citations": 0,
          			"paper_year": 2008,
          			"collab_auths": [
          				11434
          			],
          			"collab_authors": []
          		},
          		{
          			"paper_id": "P06-1074",
          			"paper_title": "An Iterative Implicit Feedback Approach to Personalized Search",
          			"citations": 0,
          			"paper_year": 2006,
          			"collab_auths": [
          				22138,
          				1461,
          				1460,
          				22140,
          				2268
          			],
          			"collab_authors": []
          		}
          	],
          	"name_list": [
          		"jian-yun nie"
          	]
          }, null, 3)}
          </span>
        </pre>
        <h5>Finding Conferences</h5>
        <p>
          This endpoint requires a required parameter of name
        </p>
        <pre className="command-code">
          <span>GET /conferences?name=:name</span>
        </pre>
        <p>
          An example for above endpoint is
        </p>
        <pre className="command-code">
          <span>GET /conferences?name=AC</span>
        </pre>
        <p>Response: </p>
        <pre className="command-code">
          <span>{JSON.stringify([
            	{
            		"conference_id": 15,
            		"name": [
            			"ACL"
            		]
            	},
            	{
            		"conference_id": 13,
            		"name": [
            			"NAACL"
            		]
            	},
            	{
            		"conference_id": 16,
            		"name": [
            			"TACL"
            		]
            	},
            	{
            		"conference_id": 33,
            		"name": [
            			"PACLIC"
            		]
            	},
            	{
            		"conference_id": 6,
            		"name": [
            			"EACL"
            		]
            	}
            ], null, 3)}
          </span>
        </pre>
        <h5>Single Conference</h5>
        <p>
          Here conference-id is the unique ID given by us for each conference.
          The ID can be found by search using the above endpoint
        </p>
        <pre className="command-code">
          <span>GET /conference/:conference-id</span>
        </pre>
      </Container>
    </div>
  );
}

export default ApiHelp;
