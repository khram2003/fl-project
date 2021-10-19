%{
#include <stdio.h>
#include <stdlib.h>
#include "gram.tab.hpp"
#include <iostream>
%}

%option yylineno
%option noyywrap


DISJUN      &&
CONJUN      \|\|
SEMICOLON   ;
COLON       :
REL_DEF     rel
OP_DEF      operator
OBJ_NAME    [A-Za-z_]+
OPEN_BR     \[
CLOSE_BR    \]
OPEN_R_BR   \(
CLOSE_R_BR  \)
EQ          = 
DELIM       \/\/\/
COMMA       ,
OPEN_B_BR   \{
CLOSE_B_BR  \}
CUSTOM_OP  \[[A-Za-z_]+\]

%%

 /* Print identifiers, integers and operators. */

{DISJUN}       {strcpy(yylval.str, yytext); return T_DISJUN;}
{CONJUN}       {strcpy(yylval.str, yytext); return T_CONJUN;}
{SEMICOLON}    {strcpy(yylval.str, yytext); return T_SEMICOLON;}
{COLON}        {strcpy(yylval.str, yytext); return T_COLON;}
{REL_DEF}      {strcpy(yylval.str, yytext); return T_REL_DEF;}
{OP_DEF}       {strcpy(yylval.str, yytext); return T_OP_DEF;}
{OBJ_NAME}     {strcpy(yylval.str, yytext); return T_OBJ_NAME;}
{OPEN_BR}      {strcpy(yylval.str, yytext); return T_OPEN_BR;}
{CLOSE_BR}     {strcpy(yylval.str, yytext); return T_CLOSE_BR;}
{OPEN_R_BR}    {strcpy(yylval.str, yytext); return T_OPEN_R_BR;}
{CLOSE_R_BR}   {strcpy(yylval.str, yytext); return T_CLOSE_R_BR;}
{EQ}           {strcpy(yylval.str, yytext); return T_EQ;} 
{DELIM}        {strcpy(yylval.str, yytext); return T_DELIM;}
{COMMA}        {strcpy(yylval.str, yytext); return T_COMMA;}
{OPEN_B_BR}    {strcpy(yylval.str, yytext); return T_OPEN_B_BR;}
{CLOSE_B_BR}   {strcpy(yylval.str, yytext); return T_CLOSE_B_BR;}
{CUSTOM_OP}    {strcpy(yylval.str, yytext); return T_CUSTOM_OP;} 

 /* Ignore comments and whitespace. */

#[^\n]*     {}
[ \t\r\n]   {}

<<EOF>>     {return 0;}

. {
  printf("ERROR in line %u, symbol %s\n", yylineno, yytext);
  exit(1);
}

%%