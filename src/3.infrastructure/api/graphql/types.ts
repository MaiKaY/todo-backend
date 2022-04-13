/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from './Context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** ISO-8601 encoded UTC date string. Example value: `"2022-01-01T13:37:01.337Z"` */
    DateTime: any;
};

export type CompleteInput = {
    todoId: Scalars['ID'];
};

export type CompleteOutput = {
    __typename?: 'CompleteOutput';
    error: Maybe<CompleteOutputError>;
};

export enum CompleteOutputError {
    Internal = 'INTERNAL',
    TodoAlreadyCompleted = 'TODO_ALREADY_COMPLETED',
    TodoDoesNotExists = 'TODO_DOES_NOT_EXISTS'
}

export type CreateInput = {
    description: Scalars['String'];
};

export type CreateOutput = {
    __typename?: 'CreateOutput';
    error: Maybe<CreateOutputError>;
};

export enum CreateOutputError {
    Internal = 'INTERNAL'
}

export type DeleteInput = {
    todoId: Scalars['ID'];
};

export type DeleteOutput = {
    __typename?: 'DeleteOutput';
    error: Maybe<DeleteOutputError>;
};

export enum DeleteOutputError {
    Internal = 'INTERNAL',
    TodoDoesNotExists = 'TODO_DOES_NOT_EXISTS'
}

export type Mutation = {
    __typename?: 'Mutation';
    /** Complete todo */
    complete: CompleteOutput;
    /** Create new todo */
    create: CreateOutput;
    /** Delete todo */
    delete: DeleteOutput;
    /** Uncomplete todo */
    uncomplete: UncompleteOutput;
};

export type MutationCompleteArgs = {
    input: CompleteInput;
};

export type MutationCreateArgs = {
    input: CreateInput;
};

export type MutationDeleteArgs = {
    input: DeleteInput;
};

export type MutationUncompleteArgs = {
    input: UncompleteInput;
};

export type Query = {
    __typename?: 'Query';
    /** Get all todos */
    todos: Array<Todo>;
};

export type Timeline = {
    __typename?: 'Timeline';
    completedAt: Maybe<Scalars['DateTime']>;
    createdAt: Scalars['DateTime'];
};

export type Todo = {
    __typename?: 'Todo';
    description: Scalars['String'];
    id: Scalars['ID'];
    isCompleted: Scalars['Boolean'];
    timeline: Timeline;
};

export type UncompleteInput = {
    todoId: Scalars['ID'];
};

export type UncompleteOutput = {
    __typename?: 'UncompleteOutput';
    error: Maybe<UncompleteOutputError>;
};

export enum UncompleteOutputError {
    Internal = 'INTERNAL',
    TodoDoesNotExists = 'TODO_DOES_NOT_EXISTS',
    TodoNotCompleted = 'TODO_NOT_COMPLETED'
}

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
    | ResolverFn<TResult, TParent, TContext, TArgs>
    | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
    | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
    | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
    | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
    | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
    parent: TParent,
    context: TContext,
    info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
    obj: T,
    context: TContext,
    info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
    next: NextResolverFn<TResult>,
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    CompleteInput: CompleteInput;
    CompleteOutput: ResolverTypeWrapper<CompleteOutput>;
    CompleteOutputError: CompleteOutputError;
    CreateInput: CreateInput;
    CreateOutput: ResolverTypeWrapper<CreateOutput>;
    CreateOutputError: CreateOutputError;
    DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
    DeleteInput: DeleteInput;
    DeleteOutput: ResolverTypeWrapper<DeleteOutput>;
    DeleteOutputError: DeleteOutputError;
    ID: ResolverTypeWrapper<Scalars['ID']>;
    Mutation: ResolverTypeWrapper<{}>;
    Query: ResolverTypeWrapper<{}>;
    String: ResolverTypeWrapper<Scalars['String']>;
    Timeline: ResolverTypeWrapper<Timeline>;
    Todo: ResolverTypeWrapper<Todo>;
    UncompleteInput: UncompleteInput;
    UncompleteOutput: ResolverTypeWrapper<UncompleteOutput>;
    UncompleteOutputError: UncompleteOutputError;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
    Boolean: Scalars['Boolean'];
    CompleteInput: CompleteInput;
    CompleteOutput: CompleteOutput;
    CreateInput: CreateInput;
    CreateOutput: CreateOutput;
    DateTime: Scalars['DateTime'];
    DeleteInput: DeleteInput;
    DeleteOutput: DeleteOutput;
    ID: Scalars['ID'];
    Mutation: {};
    Query: {};
    String: Scalars['String'];
    Timeline: Timeline;
    Todo: Todo;
    UncompleteInput: UncompleteInput;
    UncompleteOutput: UncompleteOutput;
};

export type CompleteOutputResolvers<
    ContextType = Context,
    ParentType extends ResolversParentTypes['CompleteOutput'] = ResolversParentTypes['CompleteOutput']
> = {
    error: Resolver<Maybe<ResolversTypes['CompleteOutputError']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateOutputResolvers<
    ContextType = Context,
    ParentType extends ResolversParentTypes['CreateOutput'] = ResolversParentTypes['CreateOutput']
> = {
    error: Resolver<Maybe<ResolversTypes['CreateOutputError']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
    name: 'DateTime';
}

export type DeleteOutputResolvers<
    ContextType = Context,
    ParentType extends ResolversParentTypes['DeleteOutput'] = ResolversParentTypes['DeleteOutput']
> = {
    error: Resolver<Maybe<ResolversTypes['DeleteOutputError']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
    ContextType = Context,
    ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
    complete: Resolver<
        ResolversTypes['CompleteOutput'],
        ParentType,
        ContextType,
        RequireFields<MutationCompleteArgs, 'input'>
    >;
    create: Resolver<
        ResolversTypes['CreateOutput'],
        ParentType,
        ContextType,
        RequireFields<MutationCreateArgs, 'input'>
    >;
    delete: Resolver<
        ResolversTypes['DeleteOutput'],
        ParentType,
        ContextType,
        RequireFields<MutationDeleteArgs, 'input'>
    >;
    uncomplete: Resolver<
        ResolversTypes['UncompleteOutput'],
        ParentType,
        ContextType,
        RequireFields<MutationUncompleteArgs, 'input'>
    >;
};

export type QueryResolvers<
    ContextType = Context,
    ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
    todos: Resolver<Array<ResolversTypes['Todo']>, ParentType, ContextType>;
};

export type TimelineResolvers<
    ContextType = Context,
    ParentType extends ResolversParentTypes['Timeline'] = ResolversParentTypes['Timeline']
> = {
    completedAt: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
    createdAt: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TodoResolvers<
    ContextType = Context,
    ParentType extends ResolversParentTypes['Todo'] = ResolversParentTypes['Todo']
> = {
    description: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    isCompleted: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    timeline: Resolver<ResolversTypes['Timeline'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UncompleteOutputResolvers<
    ContextType = Context,
    ParentType extends ResolversParentTypes['UncompleteOutput'] = ResolversParentTypes['UncompleteOutput']
> = {
    error: Resolver<Maybe<ResolversTypes['UncompleteOutputError']>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
    CompleteOutput: CompleteOutputResolvers<ContextType>;
    CreateOutput: CreateOutputResolvers<ContextType>;
    DateTime: GraphQLScalarType;
    DeleteOutput: DeleteOutputResolvers<ContextType>;
    Mutation: MutationResolvers<ContextType>;
    Query: QueryResolvers<ContextType>;
    Timeline: TimelineResolvers<ContextType>;
    Todo: TodoResolvers<ContextType>;
    UncompleteOutput: UncompleteOutputResolvers<ContextType>;
};
