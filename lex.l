%{
#include <stdio.h>
#include <stdlib.h>


enum token {
  T_DISJUN = 1, 
  T_CONJUN = 2, 
  T_SEMICOLON = 3, 
  T_COLON = 4, 
  T_REL_DEF = 5,
  T_OP_DEF = 6,
  T_OBJ_NAME = 7,
  T_OPEN_BR = 8,
  T_CLOSE_BR = 9,
  T_OPEN_R_BR = 10,
  T_CLOSE_R_BR = 11,
  T_EQ = 12,
  T_DELIM = 13,
  T_COMMA = 14,
  T_OPEN_B_BR = 15,
  T_CLOSE_B_BR = 16 
};

%}

%option yylineno
%option noyywrap


DISJUN       &&
CONJUN       \|\|
SEMICOLON    ;
COLON        :
REL_DEF      rel
OP_DEF       operator
OBJ_NAME    [A-Za-z_]+
OPEN_BR     \[
CLOSE_BR    \]
OPEN_R_BR   \(
CLOSE_R_BR  \)
EQ           = 
DELIM        \/\/\/
COMMA        ,
OPEN_B_BR    \{
CLOSE_B_BR   \}






%%

 /* Print identifiers, integers and operators. */

{DISJUN}       {return T_DISJUN;}
{CONJUN}       {return T_CONJUN;}
{SEMICOLON}    {return T_SEMICOLON;}
{COLON}        {return T_COLON;}
{REL_DEF}      {return T_REL_DEF;}
{OP_DEF}       {return T_OP_DEF;}
{OBJ_NAME}     {return T_OBJ_NAME;}
{OPEN_BR}      {return T_OPEN_BR;}
{CLOSE_BR}     {return T_CLOSE_BR;}
{OPEN_R_BR}    {return T_OPEN_R_BR;}
{CLOSE_R_BR}   {return T_CLOSE_R_BR;}
{EQ}           {return T_EQ;} 
{DELIM}        {return T_DELIM;}
{COMMA}        {return T_COMMA;}
{OPEN_B_BR}    {return T_OPEN_B_BR;}
{CLOSE_B_BR}   {return T_CLOSE_B_BR;}




 /* Ignore comments and whitespace. */

#[^\n]*     {}
[ \t\r\n]   {}

<<EOF>>     {return 0;}

. {
  printf("ERROR in line %u, symbol %s\n", yylineno, yytext);
  exit(1);
}

%%

int main(int argc, char* argv[]) {
  while (1) {
    enum token t = yylex();
    if (t == 0) {
      break;
    }
    if (t == T_DISJUN) {
      printf("T_DISJUN %s\n", yytext);
    } else if (t == T_CONJUN) {
      printf("T_CONJUN %s\n", yytext);
    } else if (t == T_SEMICOLON) {
      printf("T_SEMICOLON %s\n", yytext);
    } else if (t == T_COLON) {
      printf("T_COLON %s\n", yytext);
    } else if (t == T_REL_DEF) {
      printf("T_REL_DEF %s\n", yytext);
    } else if (t == T_OP_DEF) {
      printf("T_OP_DEF %s\n", yytext);
    } else if (t == T_OBJ_NAME) {
      printf("T_OBJ_NAME %s\n", yytext);
    } else if (t == T_EQ) {
      printf("T_EQ %s\n", yytext);
    } else if (t == T_OPEN_BR) {
      printf("T_OPEN_BR %s\n", yytext);
    } else if (t == T_CLOSE_BR) {
      printf("T_CLOSE_BR %s\n", yytext);
    } else if (t == T_OPEN_R_BR) {
      printf("T_OPEN_R_BR %s\n", yytext);
    } else if (t == T_CLOSE_R_BR) {
      printf("T_CLOSE_R_BR %s\n", yytext);
    } else if (t == T_DELIM) {
      printf("T_DELIM %s\n", yytext);
    } else if (t == T_COMMA) {
      printf("T_COMMA %s\n", yytext);
    }  else if (t == T_OPEN_B_BR) {
      printf("T_OPEN_B_BR %s\n", yytext);
    } else if (t == T_CLOSE_B_BR) {
      printf("T_CLOSE_B_BR %s\n", yytext);
    }
  };
  return EXIT_SUCCESS ;
}