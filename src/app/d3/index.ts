export * from './d3.service';
export * from './models';
export * from './directives';


let r = [
  {
    "keys": ["p"],
    "length": 1,
    "_fields": [{
      "start": {
        "identity": {"low": 1530, "high": 0},
        "labels": ["Target"],
        "properties": {
          "name": "Epidermal growth factor receptor (EC 2.7.10.1) (Pr...",
          "uniprot_id": "P00533",
          "fullname": "Epidermal growth factor receptor (EC 2.7.10.1) (Proto-oncogene c-ErbB-1) (Receptor tyrosine-protein kinase erbB-1)",
          "uuid": "be869ae4-fb34-4b0a-8f77-2b5d58a96682"
        }
      },
      "end": {
        "identity": {"low": 445, "high": 0},
        "labels": ["Target"],
        "properties": {
          "name": "Estrogen receptor (ER) (ER-alpha) (Estradiol recep...",
          "uniprot_id": "P03372",
          "fullname": "Estrogen receptor (ER) (ER-alpha) (Estradiol receptor) (Nuclear receptor subfamily 3 group A member 1)",
          "uuid": "1b5751ec-793e-41f4-8758-bc399265d06c"
        }
      },
      "segments": [{
        "start": {
          "identity": {"low": 1530, "high": 0},
          "labels": ["Target"],
          "properties": {
            "name": "Epidermal growth factor receptor (EC 2.7.10.1) (Pr...",
            "uniprot_id": "P00533",
            "fullname": "Epidermal growth factor receptor (EC 2.7.10.1) (Proto-oncogene c-ErbB-1) (Receptor tyrosine-protein kinase erbB-1)",
            "uuid": "be869ae4-fb34-4b0a-8f77-2b5d58a96682"
          }
        },
        "relationship": {
          "identity": {"low": 5730, "high": 0},
          "start": {"low": 1530, "high": 0},
          "end": {"low": 445, "high": 0},
          "type": "REGULATES",
          "properties": {
            "max_confidence_value": 0.27,
            "confidence_values": ["0.27"],
            "references": ["pubmed:11887937"],
            "signor_intrxn_ids": ["SIGNOR:SIGNOR-115734"],
            "ppi_uid": "P00533_P03372",
            "mechanisms": ["psi-mi:MI:0217(phosphorylation reaction)"],
            "uuid": "c1a8741f-64c1-4719-9c2e-91fd5cc45591",
            "causal_statements": ["psi-mi:MI:2235(up-regulates)"]
          }
        },
        "end": {
          "identity": {"low": 445, "high": 0},
          "labels": ["Target"],
          "properties": {
            "name": "Estrogen receptor (ER) (ER-alpha) (Estradiol recep...",
            "uniprot_id": "P03372",
            "fullname": "Estrogen receptor (ER) (ER-alpha) (Estradiol receptor) (Nuclear receptor subfamily 3 group A member 1)",
            "uuid": "1b5751ec-793e-41f4-8758-bc399265d06c"
          }
        }
      }],
      "length": 1
    }],
    "_fieldLookup": {"p": 0}
  }
  , {
    "keys": ["p"],
    "length": 1,
    "_fields": [{
      "start": {
        "identity": {"low": 2026, "high": 0},
        "labels": ["Target"],
        "properties": {
          "name": "Proto-oncogene tyrosine-protein kinase Src (EC 2.7...",
          "uniprot_id": "P12931",
          "fullname": "Proto-oncogene tyrosine-protein kinase Src (EC 2.7.10.2) (Proto-oncogene c-Src) (pp60c-src) (p60-Src)",
          "uuid": "65a7c36f-1bba-4eea-a237-1461215e672f"
        }
      },
      "end": {
        "identity": {"low": 445, "high": 0},
        "labels": ["Target"],
        "properties": {
          "name": "Estrogen receptor (ER) (ER-alpha) (Estradiol recep...",
          "uniprot_id": "P03372",
          "fullname": "Estrogen receptor (ER) (ER-alpha) (Estradiol receptor) (Nuclear receptor subfamily 3 group A member 1)",
          "uuid": "1b5751ec-793e-41f4-8758-bc399265d06c"
        }
      },
      "segments": [{
        "start": {
          "identity": {"low": 2026, "high": 0},
          "labels": ["Target"],
          "properties": {
            "name": "Proto-oncogene tyrosine-protein kinase Src (EC 2.7...",
            "uniprot_id": "P12931",
            "fullname": "Proto-oncogene tyrosine-protein kinase Src (EC 2.7.10.2) (Proto-oncogene c-Src) (pp60c-src) (p60-Src)",
            "uuid": "65a7c36f-1bba-4eea-a237-1461215e672f"
          }
        },
        "relationship": {
          "identity": {"low": 2953, "high": 0},
          "start": {"low": 2026, "high": 0},
          "end": {"low": 445, "high": 0},
          "type": "REGULATES",
          "properties": {
            "max_confidence_value": 0.23,
            "confidence_values": ["0.23"],
            "references": ["pubmed:9500442"],
            "signor_intrxn_ids": ["SIGNOR:SIGNOR-55857"],
            "ppi_uid": "P12931_P03372",
            "mechanisms": ["psi-mi:MI:0217(phosphorylation reaction)"],
            "uuid": "b43c7690-7536-4c7d-b884-10a968e18638",
            "causal_statements": ["psi-mi:MI:2235(up-regulates)"]
          }
        },
        "end": {
          "identity": {"low": 445, "high": 0},
          "labels": ["Target"],
          "properties": {
            "name": "Estrogen receptor (ER) (ER-alpha) (Estradiol recep...",
            "uniprot_id": "P03372",
            "fullname": "Estrogen receptor (ER) (ER-alpha) (Estradiol receptor) (Nuclear receptor subfamily 3 group A member 1)",
            "uuid": "1b5751ec-793e-41f4-8758-bc399265d06c"
          }
        }
      }],
      "length": 1
    }],
    "_fieldLookup": {"p": 0}
  }
  , {
    "keys": ["p"],
    "length": 1,
    "_fields": [{
      "start": {
        "identity": {"low": 2026, "high": 0},
        "labels": ["Target"],
        "properties": {
          "name": "Proto-oncogene tyrosine-protein kinase Src (EC 2.7...",
          "uniprot_id": "P12931",
          "fullname": "Proto-oncogene tyrosine-protein kinase Src (EC 2.7.10.2) (Proto-oncogene c-Src) (pp60c-src) (p60-Src)",
          "uuid": "65a7c36f-1bba-4eea-a237-1461215e672f"
        }
      },
      "end": {
        "identity": {"low": 640, "high": 0},
        "labels": ["Target"],
        "properties": {
          "name": "Tyrosine-protein kinase ABL1 (EC 2.7.10.2) (Abelso...",
          "uniprot_id": "P00519",
          "fullname": "Tyrosine-protein kinase ABL1 (EC 2.7.10.2) (Abelson murine leukemia viral oncogene homolog 1) (Abelson tyrosine-protein kinase 1) (Proto-oncogene c-Abl) (p150)",
          "uuid": "bde25dd6-258e-4be8-b860-ea7e4a017469"
        }
      },
      "segments": [{
        "start": {
          "identity": {"low": 2026, "high": 0},
          "labels": ["Target"],
          "properties": {
            "name": "Proto-oncogene tyrosine-protein kinase Src (EC 2.7...",
            "uniprot_id": "P12931",
            "fullname": "Proto-oncogene tyrosine-protein kinase Src (EC 2.7.10.2) (Proto-oncogene c-Src) (pp60c-src) (p60-Src)",
            "uuid": "65a7c36f-1bba-4eea-a237-1461215e672f"
          }
        },
        "relationship": {
          "identity": {"low": 3816, "high": 0},
          "start": {"low": 2026, "high": 0},
          "end": {"low": 640, "high": 0},
          "type": "REGULATES",
          "properties": {
            "max_confidence_value": 0.45,
            "confidence_values": ["0.45", "0.45"],
            "references": ["pubmed:11847100", "pubmed:11847100"],
            "signor_intrxn_ids": ["SIGNOR:SIGNOR-246307", "SIGNOR:SIGNOR-246311"],
            "ppi_uid": "P12931_P00519",
            "mechanisms": ["psi-mi:MI:0217(phosphorylation reaction)", "psi-mi:MI:0217(phosphorylation reaction)"],
            "uuid": "144bb97e-3bc6-464d-bc0c-8512bcb0b1ff",
            "causal_statements": ["psi-mi:MI:2236(up-regulates activity)", "psi-mi:MI:2236(up-regulates activity)"]
          }
        },
        "end": {
          "identity": {"low": 640, "high": 0},
          "labels": ["Target"],
          "properties": {
            "name": "Tyrosine-protein kinase ABL1 (EC 2.7.10.2) (Abelso...",
            "uniprot_id": "P00519",
            "fullname": "Tyrosine-protein kinase ABL1 (EC 2.7.10.2) (Abelson murine leukemia viral oncogene homolog 1) (Abelson tyrosine-protein kinase 1) (Proto-oncogene c-Abl) (p150)",
            "uuid": "bde25dd6-258e-4be8-b860-ea7e4a017469"
          }
        }
      }],
      "length": 1
    }],
    "_fieldLookup": {"p": 0}
  }


];

